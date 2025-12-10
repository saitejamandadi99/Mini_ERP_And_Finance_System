const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getRiskScore,getCashFlowForecast} = require('../controllers/aiController')

router.get('/risk-score', authMiddleware, checkRole([1,2]),getRiskScore)
router.get('/cash-flow-forecast', authMiddleware, checkRole([1,2]), getCashFlowForecast);

module.exports = router;