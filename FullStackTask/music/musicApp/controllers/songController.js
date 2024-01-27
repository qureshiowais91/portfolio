// controllers/songController.js
const { Song, Genre } = require('../models/song');

// Create a new song
const createSong = async (req, res) => {
    try {
        const { title, artist, album, genreId, songFile, releaseDate } = req.body;

        // Check if the genre exists
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return res.status(400).json({ message: 'Invalid genre ID.' });
        }

        const newSong = new Song({
            title,
            artist,
            album,
            genre: genreId,
            songFile: Buffer.from(songFile, 'base64'), // Assuming songFile is base64 encoded
            releaseDate,
        });

        await newSong.save();

        res.status(201).json(newSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all songs
const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find().populate('genre');
        res.status(200).json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get a song by ID
const getSongById = async (req, res) => {
    try {
        const songId = req.params.id;

        const song = await Song.findById(songId).populate('genre');

        if (!song) {
            return res.status(404).json({ message: 'Song not found.' });
        }

        res.status(200).json(song);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a song by ID
const updateSongById = async (req, res) => {
    try {
        const songId = req.params.id;
        const { title, artist, album, genreId, releaseDate } = req.body;

        // Check if the genre exists
        const genre = await Genre.findById(genreId);
        if (!genre) {
            return res.status(400).json({ message: 'Invalid genre ID.' });
        }

        const updatedSong = await Song.findByIdAndUpdate(
            songId,
            {
                title,
                artist,
                album,
                genre: genreId,
                releaseDate,
            },
            { new: true, runValidators: true }
        ).populate('genre');

        if (!updatedSong) {
            return res.status(404).json({ message: 'Song not found.' });
        }

        res.status(200).json(updatedSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete a song by ID
const deleteSongById = async (req, res) => {
    try {
        const songId = req.params.id;

        const deletedSong = await Song.findByIdAndRemove(songId).populate('genre');

        if (!deletedSong) {
            return res.status(404).json({ message: 'Song not found.' });
        }

        res.status(200).json(deletedSong);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    createSong,
    getAllSongs,
    getSongById,
    updateSongById,
    deleteSongById,
};
