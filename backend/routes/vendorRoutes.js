const express = require('express')
const router = express.Router() 
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {getVendors, createVendor, updateVendor, deleteVendor} = require('../controllers/vendorControllers')

router.get('/', authMiddleware, checkRole([1,2]), getVendors)
router.post('/',authMiddleware, checkRole([1,2]), createVendor)
router.put('/:id', authMiddleware, checkRole([1,2]), updateVendor)
router.delete('/:id', authMiddleware, checkRole([1,2]), deleteVendor)

module.exports = router