const express = require('express');

const router = express.Router();

const { getAllGenres, getGenreById, createGenre } = require('../controllers/genreController');
/**
 * @swagger
 * /api/genres/:
 *   get:
 *     summary: Get all genres
 *     description: Retrieve a list of all genres.
 *     responses:
 *       '200':
 *         description: A list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *       '500':
 *         description: Internal server error.
 */
router.get('/', getAllGenres);

/**
 * @swagger
 * /api/genres:
 *   post:
 *     summary: Create a new genre
 *     description: Create a new genre with provided name and description.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       '201':
 *         description: Successfully created a new genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       '400':
 *         description: Bad request, check request body.
 *       '500':
 *         description: Internal server error.
 */
router.post('/', createGenre);

module.exports = router;