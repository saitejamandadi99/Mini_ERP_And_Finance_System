const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

const {recordPayment,getPaymentsForInvoice} = require('../controllers/paymentController');

// Admin + Finance Manager
router.post('/', authMiddleware, checkRole([1, 2]), recordPayment);
router.get('/:invoice_id', authMiddleware, checkRole([1, 2]), getPaymentsForInvoice);

module.exports = router;
