const express = require('express');
const router = express.Router();
const { asynHandler } = require("../util/asyncHandler");
const { loginUser,registerUser } = require('../Controller/userController');

// User Registration Endpoint
router.post('/register', asynHandler(registerUser));

// Account Activation Endpoint
// router.get('/activate/:activationToken', activateAccount);

// User Login Endpoint
router.post('/login', asynHandler(loginUser));

// Forgot Password Request Endpoint
// router.post('/forgot-password', forgotPassword);

// Password Reset Endpoint
// router.post('/reset-password/:resetToken', resetPassword);

module.exports = router;