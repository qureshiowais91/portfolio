const mongoose = require('mongoose');

// Define the Genre Schema
const genreSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

// Define the Song Schema
const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    url: { type: String, required: true },
    releaseDate: { type: Date, required: true },
});

// Create the Genre model
const Genre = mongoose.model('Genre', genreSchema);

// Create the Song model
const Song = mongoose.model('Song', songSchema);

module.exports = { Genre, Song };
