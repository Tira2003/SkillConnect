// backend/routes/leaderboardRoutes.js
// Routes for leaderboard functionality

const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");
const authMiddleware = require("../middlewares/authMiddleware");

// GET /api/leaderboard - Get top students by GPA with optional filtering
router.get("/", authMiddleware, leaderboardController.getLeaderboard);

module.exports = router;
