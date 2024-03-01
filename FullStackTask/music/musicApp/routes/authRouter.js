const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();
/**
 * Registers a new user.
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with provided username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '201':
 *         description: Successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful registration.
 *                 status:
 *                   type: boolean
 *                   description: Indicates the status of the registration process.
 *       '400':
 *         description: Invalid request data or user already exists.
 */
router.post('/register', registerUser);
/**
 * Logs in a user.
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in user
 *     description: Logs in a user with provided email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Password of the user.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: Email of the authenticated user.
 *                 isAuthenticated:
 *                   type: boolean
 *                   description: Indicates if the user is authenticated.
 *       '400':
 *         description: Invalid request data.
 *       '401':
 *         description: Unauthorized - Invalid credentials.
 */
router.post('/login', loginUser);

module.exports = router;