const express = require('express');
const router = express.Router();
const { getAllSongs, getSongById, createSong } = require('../controllers/songController');
const multer = require('multer'); 

const storage = multer.memoryStorage(); // Store files in memory as/ Buffers
// const upload = multer({ storage: storage });

router.get('/', getAllSongs);
router.get('/:id', getSongById);
router.post('/new', createSong);
// router.post('/upload',upload.single('file'),uploadSong);
module.exports = router;