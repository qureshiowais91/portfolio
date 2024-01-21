var sourceBuffer=0;
const playStreamedMusic = async () => {
  const musicFilename = 'coverless-book.mp3'; // Replace with the actual filename
  let startByte = 0; // Initialize the byte range
  
  // Initialize the MediaSource outside the loop
  const mediaSource = new MediaSource();
  audioPlayer.src = URL.createObjectURL(mediaSource);

  // Handle the source open event
  mediaSource.addEventListener('sourceopen', async () => {
    sourceBuffer = mediaSource.addSourceBuffer('audio/mpeg');


    // Function to handle each chunk of data
    const handleDataChunk = async (dataChunk) => {
      return new Promise((resolve, reject) => {
        sourceBuffer.addEventListener('updateend', () => {
          resolve();
        });

        sourceBuffer.addEventListener('error', (error) => {
          reject(error);
        });

        sourceBuffer.appendBuffer(dataChunk);
      });
    };

    while (true) {
      const response = await fetch(`http://127.0.0.1:3000/stream/?file=${musicFilename}&lastEnd=${startByte}`);

      // Process the response in chunks
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        // Handle each chunk of data
        await handleDataChunk(value);
      }

      // Update the startByte for the next request
      startByte += 1024; // Adjust the chunk size as needed

      // You may want to add a delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100)); // 1 second delay
    }
  });

  // Handle errors
  mediaSource.addEventListener('error', (error) => {
    console.error('MediaSource error:', error);
  });

  // Handle the end of the stream
  mediaSource.addEventListener('sourceended', () => {
    console.log('MediaSource stream ended.');
  });
};

const bufferRemovalInterval = 30000; // milliseconds

// Variable to hold the interval ID
let removalIntervalId;

// Function to remove buffer at regular intervals
const removeBuffer = () => {
  console.log('Removing buffer...');
  sourceBuffer.remove(0, 10); // Remove data from time 0 to 10 seconds
  // Implement your logic to remove buffer here
};

audioPlayer.addEventListener('play', () => {
  console.log('Audio playback started!');

  // Start the interval for buffer removal
  removalIntervalId = setInterval(removeBuffer, bufferRemovalInterval);
});

// Event listener for the 'pause' event
audioPlayer.addEventListener('pause', () => {
  console.log('Audio playback paused!');

  // Stop the interval for buffer removal
  clearInterval(removalIntervalId);
});




playStreamedMusic();
