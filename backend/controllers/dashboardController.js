const pool = require("../config/db");


//KPI METRICS API

const getKPI = async (req, res) => {
    try {
        // Projects summary
        const projects = await pool.query(`
            SELECT 
                COUNT(*) AS total_projects,
                COALESCE(SUM(budget), 0) AS total_budget,
                COALESCE(SUM(spent), 0) AS total_spent
            FROM projects;
        `);

        // Invoice summary
        const invoices = await pool.query(`
            SELECT 
                COUNT(*) AS total_invoices,
                COALESCE(SUM(amount), 0) AS total_invoiced
            FROM invoices;
        `);

        // Total paid
        const paid = await pool.query(`
            SELECT COALESCE(SUM(converted_amount), 0) AS total_paid
            FROM payments;
        `);

        // Receivables
        const receivables = await pool.query(`
            SELECT COALESCE(SUM(i.amount - COALESCE(p.total_paid, 0)), 0) AS receivable
            FROM invoices i
            LEFT JOIN (
                SELECT invoice_id, SUM(converted_amount) AS total_paid
                FROM payments GROUP BY invoice_id
            ) p ON i.id = p.invoice_id
            WHERE i.customer_id IS NOT NULL;
        `);

        // Payables
        const payables = await pool.query(`
            SELECT COALESCE(SUM(i.amount - COALESCE(p.total_paid, 0)), 0) AS payable
            FROM invoices i
            LEFT JOIN (
                SELECT invoice_id, SUM(converted_amount) AS total_paid
                FROM payments GROUP BY invoice_id
            ) p ON i.id = p.invoice_id
            WHERE i.vendor_id IS NOT NULL;
        `);

        // Cash
        const cash = await pool.query(`
            SELECT COALESCE(SUM(balance), 0) AS cash_balance
            FROM accounts
            WHERE name ILIKE '%cash%' OR name ILIKE '%bank%';
        `);

        return res.status(200).json({
            message: "KPI metrics generated",
            kpi: {
                projects: projects.rows[0],
                invoices: invoices.rows[0],
                total_paid: paid.rows[0].total_paid,
                receivable: receivables.rows[0].receivable,
                payable: payables.rows[0].payable,
                cash_balance: cash.rows[0].cash_balance
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



//CASH FLOW TREND API (last 6 months)

const getCashFlowTrend = async (req, res) => {
    try {
        const inflow = await pool.query(`
            SELECT 
                DATE_TRUNC('month', payment_date) AS month,
                SUM(converted_amount) AS total_inflow
            FROM payments
            GROUP BY month
            ORDER BY month DESC
            LIMIT 6;
        `);

        const outflow = await pool.query(`
            SELECT 
                DATE_TRUNC('month', created_at) AS month,
                SUM(amount) AS total_outflow
            FROM invoices
            WHERE vendor_id IS NOT NULL
            GROUP BY month
            ORDER BY month DESC
            LIMIT 6;
        `);

        return res.status(200).json({
            message: "Cash flow trend generated",
            inflow: inflow.rows,
            outflow: outflow.rows
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



//ALERTS API

const getAlerts = async (req, res) => {
    try {
        // Overdue invoices
        const overdue = await pool.query(`
            SELECT id, customer_id, amount, due_date 
            FROM invoices
            WHERE status IN ('Pending', 'Partially Paid')
            AND due_date < CURRENT_DATE;
        `);

        // Low cash alert
        const cash = await pool.query(`
            SELECT COALESCE(SUM(balance), 0) AS cash_balance
            FROM accounts
            WHERE name ILIKE '%cash%' OR name ILIKE '%bank%';
        `);

        let cash_alert = null;
        if (cash.rows[0].cash_balance < 3000) {
            cash_alert = "LOW CASH WARNING";
        }

        // Simple project risk alert (use risk score logic)
        const riskProjects = await pool.query(`
            SELECT id, name, budget, spent, progress 
            FROM projects
            WHERE spent > budget * 0.85 
               OR progress < 30;
        `);

        return res.status(200).json({
            message: "Alerts generated",
            alerts: {
                overdue_invoices: overdue.rows,
                low_cash: cash_alert,
                risky_projects: riskProjects.rows
            }
        });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports = {
    getKPI,
    getCashFlowTrend,
    getAlerts
};
