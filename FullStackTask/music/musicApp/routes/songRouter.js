const express = require('express');
const router = express.Router();
const {
  getAllSongs,
  getSongById,
  createSong,
} = require('../controllers/songController');

// Songs routes
router.get('/songs', getAllSongs);
router.get('/songs/:id', getSongById);
router.post('/songs', createSong);

module.exports = router;
