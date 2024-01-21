const express = require('express');

const router = express.Router();

const { getAllGenres, getGenreById, createGenre } = require('../controllers/genreController');

router.get('/', getAllGenres);
router.get('/:id', getGenreById);
router.post('/new', createGenre);

module.exports = router;