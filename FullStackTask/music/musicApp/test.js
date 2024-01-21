// const fs = require('node:fs/promises');
// const { element } = require('prop-types');

// // (async () => {
// //     console.time('writeMany');
// //     const fileHandle = await fs.open("tesst.txt", "w");
// //     const stream = fileHandle.createWriteStream();

// //     console.log(stream.writableHighWaterMark)
// //     for (let i = 0; i <=1000000; i++) {
// //         const buff = Buffer.from(` ${i} `, "utf-8");
// //         stream.write(buff) ?

// //     }
// //     console.timeEnd('writeMany');
// // })()

// // const fs = require('node:fs');

// // (async () => {
// //     console.time('writeMany');
// //     fs.open("test1.txt", "w", (err, fd) => {
// //         for (let i = 0; i < 1000000; i++) {
// //             fs.writeSync(fd, ` ${i} `, () => { })
// //         }
// //         console.timeEnd('writeMany')
// //     })
// // })();

// (async () => {
//     console.time('writeEnd');

//     const fileHandle = await fs.open('tesst.txt', 'w');
//     const stream = fileHandle.createWriteStream();
//     let i = 0;
//     const writeMany = () => {
//         while (i < 10000000) {
//             const buff = Buffer.from(` ${i}`, 'utf-8');

//             if (i === 9999999) {
//                 return stream.end(buff);
//             }
//             if (!stream.write(buff)) break;
//             i++;
//         }
//     };

//     writeMany();

//     stream.on('drain', () => {
//         // console.log("drain")
//         writeMany();
//     });

//     stream.on("finish", () => {
//         console.timeEnd("writeEnd");
//         fileHandle.close();
//     })
// })();




// // His task is to delete the two words that comes together
// // output sentence have distinct words compared to their adjacent words.


// // create array using space delemeter 
// // now check if adjacent word is same or diffrent
// // for example 
// // arr[0] == arr[1] if true delet both and loop until length - 1
// // now convert this result arr to string and return 

// create two stack out of 1 array 

// put element of array 1 to array(stack two) untile array length  == length/2

// now pop both side one element and check if elemnt is same if elemtn is same untile bottom of both return yes if at any elemnt no same return no


function areHalvesMirrored(array) {
    const length = array.length;
  
    if (length % 2 !== 0) {
      // If the array length is odd, it can't be mirrored
      return false;
    }
  
    const stack1 = [];
    const stack2 = [];
     
    var i=0;
    // Push elements of the first half into stack1
    for (; i < (length/2);i++) {
      stack1.push(array[i]);
    }
  
    // Push elements of the second half into stack2
    for (; i <= length-1; i++) {
      stack2.push(array[i]);
    }
    
    console.log(stack1);
    console.log(stack2.reverse())
    // Pop elements from both stacks and check for mirroring
    while (stack1.length > 0 && stack2.length > 0) {
      if (stack1.pop() !== stack2.pop()) {
        return false; // Elements are not the same
      }
    }
  
    return true; // All elements matched
  }
  
  // Test case
  console.log(areHalvesMirrored(['{', '[', '(', ')', ']', '}'])); // true
  


// server.js
const express = require('express');
const http = require('http');
const { Server: WebSocketServer } = require('ws');
const mongoose = require('mongoose');
const Bull = require('bull');

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true });

let gridfsBucket;

const conn = mongoose.connection;
conn.once('open', () => {
  // Initialize GridFSBucket
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: 'uploads', // Specify the bucket name
  });
});

const { Queue } = require('bull');
const audioChunkQueue = new Queue('audioChunkQueue');

app.get('/stream/', (req, res) => {
  const filename = req.query.file;
  const lastEnd = parseInt(req.query.lastEnd) || 0;

  // Find the file by name in GridFS
  const fileStream = gridfsBucket.openDownloadStreamByName(filename);

  // Set up response headers for streaming
  res.set('Content-Type', 'audio/mpeg');
  res.set('Content-Disposition', 'inline; filename=' + filename);

  const start = lastEnd;
  const initialChunkSize = 65536; // 64 KB, adjust this value based on your preference
  const end = start + initialChunkSize - 1;

  const chunkSize = initialChunkSize;
  res.status(206).set({
    'Content-Range': `bytes ${start}-${end}/${fileStream.length}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
  });

  // Stream the specified chunk of the file to the response
  fileStream.pipe(res, { start, end: end + 1 });

  // Add the next chunk processing job to the queue
  audioChunkQueue.add('processNextChunk', { filename, nextStart: end + 1, nextEnd: end + initialChunkSize });
});

audioChunkQueue.process('processNextChunk', async (job) => {
  const { filename, nextStart, nextEnd } = job.data;
  // Implement your logic to process the next chunk
  console.log('Processing next chunk:', filename, nextStart, nextEnd);
  // ... Your logic here

  // Optionally, notify connected WebSocket clients about the next chunk
  wss.clients.forEach(client => {
    client.send(JSON.stringify({ type: 'nextChunk', filename, nextStart, nextEnd }));
  });
});

wss.on('connection', ws => {
  // Handle WebSocket connections
  console.log('WebSocket client connected');

  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


