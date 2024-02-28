// resolvers.js
const { createWriteStream } = require('fs');
const { v4: uuidv4 } = require('uuid');

const resolvers = {
  Query: {
    // Resolver for fetching files
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      try {
        const { createReadStream, filename, mimetype } = await file;

        // Generate a unique ID for the file
        const fileId = uuidv4();
        // Define the path where the file will be saved
        const filePath = `./uploads/${fileId}-${filename}`;

        // Create a writable stream to save the file
        const stream = createReadStream().pipe(createWriteStream(filePath));
        // Attach an event listener to the 'data' event
        stream.on('data', (chunk) => {
          // Log the chunk buffer to the console
          console.log(chunk);
        });

        // Attach an event listener to the 'end' event (optional)
        stream.on('end', () => {
          console.log('Stream ended');
        });

        // Attach an event listener to the 'error' event (optional)
        stream.on('error', (error) => {
          console.error('Error reading stream:', error);
        });
        // Process the file upload logic here
        // For example, save file metadata to a database

        return {
          id: fileId,
          filename: filename,
          // Add other fields as needed
        };
      } catch (error) {
        console.error(error);
        throw new Error('Failed to upload file');
      }
    }
  }
};

module.exports = resolvers;
