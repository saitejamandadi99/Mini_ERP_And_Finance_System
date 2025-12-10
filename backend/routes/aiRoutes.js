const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getRiskScore} = require('../controllers/aiController')

router.get('/risk-score', authMiddleware, checkRole([1,2]),getRiskScore)

module.exports = router;