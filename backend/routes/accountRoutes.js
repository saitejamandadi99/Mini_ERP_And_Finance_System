const express = require('express')
const router  = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getAccounts, createAccount, updateAccount, deleteAccount} = require('../controllers/accountControllers')
//1 = admin , 2 = finance manager only they can view and change the account details
router.get('/', authMiddleware,checkRole([1,2]), getAccounts )
router.post('/', authMiddleware, checkRole([1,2]), createAccount)
router.put('/:id', authMiddleware, checkRole([1,2]), updateAccount)
router.delete('/:id', authMiddleware, checkRole([1,2]), deleteAccount)

module.exports = router