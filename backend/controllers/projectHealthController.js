const pool = require("../config/db");

const getProjectHealth = async (req, res) => {
    try {
        const { project_id } = req.params;

        const result = await pool.query(
            `SELECT id, name, budget, spent, progress, start_date, end_date 
             FROM projects WHERE id = $1`,
            [project_id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Project not found" });
        }

        const project = result.rows[0];

        // Budget Usage
        const budgetUsed = Number(project.spent);
        const budgetTotal = Number(project.budget);
        const budgetUsage = budgetTotal > 0 ? (budgetUsed / budgetTotal) * 100 : 0;

        // Time Usage
        const today = new Date();
        const startDate = new Date(project.start_date);
        const endDate = new Date(project.end_date);

        let timeUsage = 0;

        if (project.start_date && project.end_date) {
            const totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
            const usedDays = (today - startDate) / (1000 * 60 * 60 * 24);
            timeUsage = totalDays > 0 ? (usedDays / totalDays) * 100 : 0;
        }

        // Progress vs Time
        const expectedProgress = Math.min(timeUsage, 100); // expected progress based on schedule
        const actualProgress = Number(project.progress || 0);

        // Health Score Calculation
        let score = 100;

        // Budget issues
        if (budgetUsage > 80) score -= 15;
        if (budgetUsage > 100) score -= 30;

        // Schedule slippage
        if (actualProgress < expectedProgress - 20) score -= 25;
        else if (actualProgress < expectedProgress - 10) score -= 10;

        if (score < 0) score = 0;

        //Status
        let status = "On Track";
        if (score < 70) status = "At Risk";
        if (score < 50) status = "Critical";

        return res.status(200).json({
            message: "Project health calculated",
            project: {
                id: project.id,
                name: project.name,
                budgetTotal,
                budgetUsed,
                budgetUsage: budgetUsage.toFixed(2) + "%",
                timeUsage: timeUsage.toFixed(2) + "%",
                expectedProgress: expectedProgress.toFixed(2),
                actualProgress,
                score,
                status
            }
        });

    } catch (error) {
        return res.status(500).json({ message: error.message || "Internal server error" });
    }
};

module.exports = { getProjectHealth };
