const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById, createSong } = require('../controllers/songController');
const { uploadToS3 } = require("../controllers/songController");

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


router.post('/uploadSongFile', uploadToS3);
router.post('/uploadSongMetaData', createSong);

module.exports = router;
