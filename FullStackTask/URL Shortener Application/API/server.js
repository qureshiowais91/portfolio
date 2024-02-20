const express = require('express');
const userRoutes = require('./Router/userRoutes');
const urlRoutes = require('./Router/urlRoutes');

const errorHandler = require("./Middleware/error");
const { dbConnect } = require("./util/dbConnect");
const cors = require("cors")
require('dotenv').config()

const app = express();
const port = 3001;

dbConnect();
app.use(cors());
app.use(express.json());
app.use('/user', userRoutes);
app.use('/url', urlRoutes);
app.use(errorHandler);  

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});