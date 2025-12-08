const express = require('express');
const router = express.Router();

const {
    getIntegrationStatus,
    syncIntegration
} = require('../controllers/integrationController');

router.get('/status', getIntegrationStatus);
router.post('/sync', syncIntegration);

module.exports = router;
