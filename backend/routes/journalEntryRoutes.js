const express = require('express')
const router = express.Router()

const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/roleMiddleware')

const {createJournalEntry,approveJournalEntry,getJournalEntries} = require('../controllers/journalEntryControllers')
//admin, finance manager roles access
router.post('/', authMiddleware, checkRole([1,2]), createJournalEntry)
router.put('/approve/:id', authMiddleware, checkRole([1,2]), approveJournalEntry)
router.get('/', authMiddleware, checkRole([1,2]), getJournalEntries)

module.exports = router