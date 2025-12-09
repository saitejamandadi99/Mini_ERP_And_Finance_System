const express = require('express')
const router = express.Router() 
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getCustomers, createCustomer , updateCustomer, deleteCustomer} = require('../controllers/customerController')

router.get('/', authMiddleware, checkRole([1,2]), getCustomers)
router.post('/',authMiddleware, checkRole([1,2]), createCustomer)
router.put('/:id', authMiddleware, checkRole([1,2]), updateCustomer)
router.delete('/:id', authMiddleware, checkRole([1,2]), deleteCustomer)

module.exports = router