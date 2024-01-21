const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    url: { type: String, required: true },
    releaseDate: { type: Date, required: true },
});

const Genre = mongoose.model('Genre', genreSchema);

const Song = mongoose.model('Song', songSchema);

module.exports = { Genre, Song };
