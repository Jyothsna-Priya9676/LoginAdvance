const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    register,
    verifyOTP,
    resendOTP,
    login,
    logout,
    refreshToken,
    getProfile,
    forgotPassword,
    resetPassword,
    changePassword,
} = require("../controllers/authController");

// Authentication
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/resend-otp", resendOTP);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.post("/refresh-token", refreshToken);

// Profile
router.get("/profile", authMiddleware, getProfile);

// Password
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/change-password", authMiddleware, changePassword);

module.exports = router;