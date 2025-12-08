const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');
const { getAuditLogs } = require('../controllers/auditController');

// Admin only route
router.get('/', verifyToken, checkRole([1]), getAuditLogs);

module.exports = router;
