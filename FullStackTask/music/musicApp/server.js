const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter.js');
const songRouter = require('./routes/songRouter.js');
const genreRouter = require('./routes/genreRouter.js');
const multer = require('multer');
const cors = require('cors');  // Import the cors middleware
require('dotenv').config();

const app = express();

app.use(cors())
app.use(express.json());
console.log(process.env.MONGODB_URI);

app.use((req, res, next) => {
  console.log('Request received:', req.method, req.url);
  next();
});

app.use((req, res, next) => {
  res.on('finish', () => {
    console.log('Response sent:', res.statusCode);
  });
  next();
});

app.use('/api/auth', cors(), authRouter);
app.use('/api/song', songRouter);
app.use('/api/genres', genreRouter);

mongoose.connect(process.env.MONGODB_URI);

const conn = mongoose.connection;
let gridfsBucket;

conn.once('open', () => {
  // Initialize GridFSBucket
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads', // Specify the bucket name
  });
});

// Create storage engine using multer
const storage = multer.memoryStorage();

// Set up multer with GridFSBucket
const upload = multer({ storage });

app.post('/store_data', upload.single('file'), (req, res) => {
  // Assuming other form data is sent as JSON in the request body
  const form_data = req.file;

  // Store other form data in MongoDB
  const FormModel = mongoose.model('SongsFiles', new mongoose.Schema({}));
  const formDataInstance = new FormModel(form_data);
  formDataInstance.save();

  // Handle file upload using GridFSBucket
  const buffer = req.file.buffer;
  const filename = req.file["originalname"];

  // Create a write stream
  const uploadStream = gridfsBucket.openUploadStream(filename);
  uploadStream.write(buffer);
  uploadStream.end();

  // Return a response (customize based on your needs)
  res.json({ message: 'Data stored successfully' });
});

app.get('/stream/', (req, res) => {
  const filename = req.query.file;
  const lastEnd = parseInt(req.query.lastEnd) || 0;

  const fileStream = gridfsBucket.openDownloadStreamByName(filename, {
    chunkSizeBytes: parseInt(process.env.CHUNK_SIZE), // Adjust the chunk size as needed
  });

  res.set('Content-Type', 'audio/mpeg');
  res.set('Content-Disposition', 'inline; filename=' + filename);

  const start = lastEnd;
  const end = lastEnd + parseInt(process.env.CHUNK_SIZE);

  const chunkSize = (end - start) + 1;
  res.set('Access-Control-Allow-Origin', '*'); // Adjust the origin as needed
  res.set('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Adjust the allowed methods
  res.set('Access-Control-Allow-Headers', 'Range, Accept-Ranges, Content-Type');
  res.set('Range', `bytes-${start}-${end}`);

  res.status(206).set({
    'Content-Range': `bytes`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
  });

  fileStream.pipe(res, { start, end: end + 1 });
});


// app.get('/stream/', (req, res) => {
//   const filename = req.query.file;

//   // Open a read stream for the file
//   var fileStream
//   if(gridfsBucket){
//    fileStream = gridfsBucket.openDownloadStreamByName(filename);
//   }

//   // Set response headers
//   res.set({
//     'Content-Type': 'audio/mpeg',
//     'Content-Disposition': 'inline; filename=' + filename,
//     'Access-Control-Allow-Origin': '*', // Adjust the origin as needed
//     'Access-Control-Allow-Methods': 'GET, OPTIONS', // Adjust the allowed methods
//     'Access-Control-Allow-Headers': 'Range, Accept-Ranges, Content-Type',
//     'Accept-Ranges': 'bytes',
//   });

//   // Pipe the file stream to the response
//   fileStream.pipe(res);
// });


app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});