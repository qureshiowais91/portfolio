const { Song } = require('../models/song');

const getAllSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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

// const uploadSong = async (req, res) => {
//     const form_data = req.body;

//     // Store other form data in MongoDB
//     const FormModel = mongoose.model('Form', new mongoose.Schema({}));
//     const formDataInstance = new FormModel(form_data);
//     formDataInstance.save();

//     // Handle file upload using GridFS
//     const buffer = req.file.buffer;
//     const writestream = gfs.createWriteStream({
//         filename: crypto.randomBytes(16).toString('hex'),
//     });
//     writestream.write(buffer);
//     writestream.end();

//     // Return a response (customize based on your needs)
//     res.json({ message: 'Data stored successfully' });
// };

module.exports = {
    getAllSongs,
    getSongById,
    createSong
};
