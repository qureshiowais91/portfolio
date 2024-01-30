const express = require('express');
const userRoutes = require('./Router/userRoutes');
// const urlRoutes = require('./Router/urlRoutes');

const app = express();
const port = 3000;

// Middleware for parsing JSON in requests
app.use(express.json());

// Use the user routes for user-related actions
app.use('/user', userRoutes);

// Use the URL routes for URL shortening actions
// app.use('/url', urlRoutes);

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});