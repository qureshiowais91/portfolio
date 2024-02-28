const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');
const authRouter = require('./routes/authRouter.js');
const songRouter = require('./routes/songRouter.js');
const genreRouter = require('./routes/genreRouter.js');
const cors = require('cors'); // Import the cors middleware
require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./models/schema/songMetaData.js');
const resolvers = require('./controllers/resolver/SongUpload.js');
// API DOCs
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// Start Apollo Server
(async () => {
  await apolloServer.start();
  // Apply Apollo Server middleware to Express app
  apolloServer.applyMiddleware({ app });
})();

app.use(cors());
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

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Music API',
      version: '1.0.0',
      description: 'Spotify Clone Music API',
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/auth', cors(), authRouter);
app.use('/api/song', songRouter);
app.use('/api/genres', genreRouter);

mongoose.connect(process.env.MONGODB_URI);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
