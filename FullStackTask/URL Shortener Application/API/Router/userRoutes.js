const express = require('express');
const router = express.Router();
const { asyncHandler } = require("../util/asyncHandler");
const { loginUser, registerUser, activateAccount, passwordReset, profile } = require('../Controller/userController');

// User Registration Endpoint
router.post('/register', asyncHandler(registerUser));

// User Login Endpoint
router.post('/login', asyncHandler(loginUser));

// Account Activation Endpoint
router.post('/activate', asyncHandler(activateAccount));

// Forgot Password Request Endpoint
router.post('/forgot-password', asyncHandler(passwordReset));

router.get('/profile', asyncHandler(profile))
// Password Reset Endpoint
// router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;