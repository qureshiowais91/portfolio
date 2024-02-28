const { Genre } = require('../models/genre');

// Get all genres
const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific genre by ID
const getGenreById = async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id);
        if (!genre) {
            return res.status(404).json({ message: 'Genre not found' });
        }
        res.json(genre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new genre
const createGenre = async (req, res) => {
    const { name, description } = req.body;

    try {
        const genre = new Genre({ name, description });
        const newGenre = await genre.save();
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllGenres,
    getGenreById,
    createGenre,
};
