const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Store files in memory as Buffers
const upload = multer({ storage: storage });

// Handle file upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  const fileBuffer = req.file.buffer;
  // Process the fileBuffer as needed (e.g., save it to MongoDB GridFS)

  res.json({ success: true, message: 'File uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
