const express = require('express');
const router = express.Router();
const { asynHandler } = require("../util/asyncHandler");
const { loginUser, registerUser, activateAccount } = require('../Controller/userController');

// User Registration Endpoint
router.post('/register', asynHandler(registerUser));

// User Login Endpoint
router.post('/login', asynHandler(loginUser));

// Account Activation Endpoint
router.post('/activate', asynHandler(activateAccount));

// Forgot Password Request Endpoint
// router.post('/forgot-password', forgotPassword);

// Password Reset Endpoint
// router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;