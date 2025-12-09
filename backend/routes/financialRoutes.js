const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

const {getBalanceSheet,getProfitAndLoss,getCashFlowStatement} = require('../controllers/financialControllers');

// Admin + Finance Manager only
router.get('/balance-sheet', authMiddleware, checkRole([1, 2]), getBalanceSheet);
router.get('/profit-loss', authMiddleware, checkRole([1, 2]), getProfitAndLoss);
router.get('/cash-flow', authMiddleware, checkRole([1, 2]), getCashFlowStatement);

module.exports = router;
