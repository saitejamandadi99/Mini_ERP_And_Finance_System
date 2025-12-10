const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const checkRole = require("../middleware/roleMiddleware");

const {getKPI,getCashFlowTrend,getAlerts} = require("../controllers/dashboardController");

router.get("/kpi", authMiddleware, checkRole([1, 2]), getKPI);
router.get("/cash-flow", authMiddleware, checkRole([1, 2]), getCashFlowTrend);
router.get("/alerts", authMiddleware, checkRole([1, 2]), getAlerts);

module.exports = router;
