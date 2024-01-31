const mongoose = require('mongoose');

function dbConnect() {
    const connectionString = process.env.DB_URI;
  
    mongoose.connect(connectionString);
  
    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });
  
    mongoose.connection.on('error', (error) => {
      console.error('Error connecting to MongoDB:', error.message);
      throw error; 
    });
  }

module.exports ={dbConnect}