const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById, createSong } = require('../controllers/songController');
const multer = require('multer'); 

const storage = multer.memoryStorage(); // Store files in memory as/ Buffers
// const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/songs:
 *   get:
 *     summary: Get all songs
 *     description: Retrieve a list of all songs.
 *     responses:
 *       '200':
 *         description: A list of songs.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Song'
 *       '500':
 *         description: Internal server error.
 */
router.get('/', getAllSongs);

/**
 * @swagger
 * /api/songs/{id}:
 *   get:
 *     summary: Get a specific song by ID
 *     description: Retrieve details of a specific song by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Details of the song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       '404':
 *         description: Song not found.
 *       '500':
 *         description: Internal server error.
 */
router.get('/:id', getSongById);

/**
 * @swagger
 * /api/songs:
 *   post:
 *     summary: Create a new song
 *     description: Create a new song with provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewSong'
 *     responses:
 *       '201':
 *         description: Successfully created a new song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       '400':
 *         description: Bad request, check request body.
 *       '500':
 *         description: Internal server error.
 /**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the song.
 *         artist:
 *           type: string
 *           description: Artist of the song.
 *         album:
 *           type: string
 *           description: Album of the song.
 *         genreId:
 *           type: string
 *           description: ID of the genre associated with the song.
 *           example: "60b9db346785b300152b4642"
 *         songFile:
 *           type: string
 *           format: binary
 *           description: Binary data representing the song file.
 *         releaseDate:
 *           type: string
 *           format: date-time
 *           description: Release date of the song.
 */
router.post('/', createSong);

// router.post('/upload',upload.single('file'),uploadSong);
module.exports = router;
