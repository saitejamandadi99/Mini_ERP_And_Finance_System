const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {createInvoice, getInvoices, getInvoicesById} = require('../controllers/invoiceController')

router.post('/',authMiddleware, checkRole([1,2]), createInvoice)
router.get('/',authMiddleware, checkRole([1,2]), getInvoices)
router.get('/:id', authMiddleware, checkRole([1,2]), getInvoicesById)

module.exports = router