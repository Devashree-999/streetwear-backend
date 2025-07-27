const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  sendOtp,
  verifyOtp,
  resetPassword,
} = require('../controllers/authController');

// Define Routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;
