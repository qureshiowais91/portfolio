const express = require('express');
const router = express.Router();
const {
  getAllGenres,
  getGenreById,
  createGenre,
} = require('../controllers/genreController');

router.get('/genres', getAllGenres);
router.get('/genres/:id', getGenreById);
router.post('/genres', createGenre);

module.exports = router;