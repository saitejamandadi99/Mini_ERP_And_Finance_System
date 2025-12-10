const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getProjectHealth} = require('../controllers/projectHealthController')

router.get('/:project_id',authMiddleware, checkRole([1,2]), getProjectHealth)

module.exports = router;