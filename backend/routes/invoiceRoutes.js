const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {createInvoice, getInvoices, getInvoicesById, getDueInvoices, getReceivableSummary , getPayableSummary } = require('../controllers/invoiceController')

router.post('/',authMiddleware, checkRole([1,2]), createInvoice)
router.get('/',authMiddleware, checkRole([1,2]), getInvoices)
router.get('/:id', authMiddleware, checkRole([1,2]), getInvoicesById)
router.get('/due', authMiddleware, checkRole([1,2]), getDueInvoices);
router.get('/summary/receivable', authMiddleware, checkRole([1,2]), getReceivableSummary);
router.get('/summary/payable', authMiddleware, checkRole([1,2]), getPayableSummary);

module.exports = router