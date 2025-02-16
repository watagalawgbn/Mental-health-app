const express = require("express");
const router = express.Router();
const { signup, signin } = require("../controllers/auth");
const { forgotPassword } = require("../controllers/forgotPassword");
const { resetPassword } = require("../controllers/resetPassword");

// Auth routes
router.post("/signup", signup);
router.post("/signin", signin);

// Password reset routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
