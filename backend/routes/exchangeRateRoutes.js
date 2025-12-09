const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const { addExchangeRates } = require("../controllers/exchangeRateController");

router.post("/", authMiddleware, checkRole([1, 2]), addExchangeRates);

module.exports = router;
