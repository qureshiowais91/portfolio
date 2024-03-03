// controllers/songController.js
const Genre = require('../models/genre');
const Song = require('../models/song');

const multer = require('multer');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

const uploadToS3 = async (req, res, next) => {
    const upload = multer({
        storage: multer.memoryStorage(),
        limits: { fileSize: 20 * 1024 * 1024 },
    }).single('mp3');

    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({ error: 'Error uploading file' });
        }

        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `mp3/${file.originalname}`, // Change the Key as needed
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Upload Error', err);
                return res.status(500).json({ error: 'Error uploading file to S3' });
            }

            console.log('Upload Success', data.Location);
            res.status(201).json({ location: data.Location }); 
        });
    });
};

// Create a new song
const createSong = async (req, res) => {
    try {
        const { title, artist, album, genreId, songURL, releaseDate } = req.body;
        console.log(req.body);
        const genre = await Genre.findById({ _id: genreId });

        if (!genre) {
            return res.status(400).json({ message: 'Invalid genre ID.' });
        }
      console.log(songURL)
        const newSong = new Song({
            title: title,
            artist: artist,
            album: album,
            genre: genreId,
            songURL: songURL,
            releaseDate: releaseDate,
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
        const genre = await Genre.findById(genreId['genreId']);
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
    getAllSongs,
    getSongById,
    updateSongById,
    deleteSongById,
    createSong,
    uploadToS3,
};
