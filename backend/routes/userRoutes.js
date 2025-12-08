const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/roleMiddleware');

const {
    getUsers,
    updateUserRole,
    deleteUser
} = require('../controllers/userControllers');

// GET all users  (Admin only)
router.get('/', authMiddleware, checkRole([1]), getUsers);

// UPDATE user role (Admin only)
router.put('/role', authMiddleware, checkRole([1]), updateUserRole);

// DELETE user (Admin only)
router.delete('/:id', authMiddleware, checkRole([1]), deleteUser);

module.exports = router;
