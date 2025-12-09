const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

const {recordPayment,getPaymentsForInvoice} = require('../controllers/paymentController');

// Admin + Finance Manager
router.post('/', auth, checkRole([1, 2]), recordPayment);
router.get('/:invoice_id', auth, checkRole([1, 2]), getPaymentsForInvoice);

module.exports = router;
