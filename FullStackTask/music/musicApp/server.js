const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter.js');
require('dotenv').config();

const app = express();

app.use(express.json());
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);

app.use('/auth', authRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});