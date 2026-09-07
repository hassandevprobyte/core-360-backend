const express = require("express");
const router = express.Router();
const rateLimiter = require("../middleware/rateLimiter");

// Controllers
const authController = require("../controller/authController");

// Middlewares
const protect = require("../middleware/authMiddleware");

router.post("/login", rateLimiter, authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);
router.patch("/changePassword", protect, authController.changePassword);

module.exports = router;
