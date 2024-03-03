const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById, createSong, getSongListByGenre } = require('../controllers/songController');
const { uploadToS3 } = require("../controllers/songController");

/**
 * @swagger
 * /api/song:
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
 * /api/song/{id}:
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
 * /api/song/uploadSongFile:
 *   post:
 *     summary: Upload an MP3 file to Amazon S3
 *     description: Uploads an MP3 file to Amazon S3 storage.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               mp3:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Successfully uploaded file to S3.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 location:
 *                   type: string
 *                   description: URL of the uploaded file in Amazon S3.
 *       '400':
 *         description: Bad request - Error uploading file or no file provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 *       '500':
 *         description: Internal server error - Error uploading file to S3.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Description of the error.
 */
router.post('/uploadSongFile', uploadToS3);
/**
 * @swagger
 * /api/song/uploadSongMetaData:
 *   post:
 *     summary: Create a new song
 *     description: Creates a new song with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               artist:
 *                 type: string
 *               album:
 *                 type: string
 *               genreId:
 *                 type: string
 *               songURL:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       '201':
 *         description: Successfully created a new song.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Song'
 *       '400':
 *         description: Bad request - Invalid genre ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the error.
 *       '500':
 *         description: Internal server error - Error creating the song.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Description of the error.
 */
router.post('/uploadSongMetaData', createSong);
router.post('/listBygenre', getSongListByGenre);
module.exports = router;
