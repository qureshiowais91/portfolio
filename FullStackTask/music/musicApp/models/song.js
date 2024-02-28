const mongoose = require('mongoose');


const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    genre: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true },
    songURL: { type: String, required: true },
    releaseDate: { type: Date, required: true },
});

const Song = mongoose.model('Song', songSchema);

module.exports = Song;
