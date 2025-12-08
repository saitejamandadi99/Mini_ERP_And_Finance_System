const pool = require('../config/db');

// Get all audit logs (Admin only)
const getAuditLogs = async (req, res) => {
    try {
        const logs = await pool.query(`
            SELECT audit_logs.*, users.name AS performed_by
            FROM audit_logs
            LEFT JOIN users ON audit_logs.user_id = users.id
            ORDER BY timestamp DESC
        `);

        return res.status(200).json({
            message: 'Audit logs fetched successfully',
            logs: logs.rows
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal server error'
        });
    }
};

module.exports = { getAuditLogs };
