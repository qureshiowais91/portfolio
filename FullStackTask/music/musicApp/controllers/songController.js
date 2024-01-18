const Song = require('../models').Song;

// Get all songs
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific song by ID
const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) {
            return res.status(404).json({ message: 'Song not found' });
        }
        res.json(song);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new song
const createSong = async (req, res) => {
    const { title, artist, album, genre, url, releaseDate } = req.body;

    try {
        const song = new Song({ title, artist, album, genre, url, releaseDate });
        const newSong = await song.save();
        res.status(201).json(newSong);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    getAllSongs,
    getSongById,
    createSong,
};
