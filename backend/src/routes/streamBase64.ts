// import { Router, Request, Response } from 'express';
// import ytdl from '@distube/ytdl-core';
// import { Transform } from 'stream';
//
// const streamRouterBase64 = Router();
//
// streamRouterBase64.get('/', async (req: Request, res: Response) => {
//   const videoId = req.query.videoId as string;
//
//   if (!videoId) {
//     return res.status(400).send('Video ID is required.');
//   }
//
//   const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//
//   try {
//     // Start fetching metadata and stream in parallel
//     const infoPromise = ytdl.getInfo(videoUrl);
//
//     let streamStarted = false;
//
//     // Handle range headers
//     const range = req.headers.range;
//     let start = 0;
//     let end: number | undefined;
//     let totalLength: number;
//
//     if (range) {
//       const parts = range.replace(/bytes=/, "").split("-");
//       start = parseInt(parts[0], 10);
//     }
//
//     // Wait for metadata to be fetched
//     const info = await infoPromise;
//
//     // Get the best audio format
//     const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
//
//     if (!audioFormat) {
//       return res.status(404).send('No audio stream found.');
//     }
//
//     totalLength = parseInt(audioFormat.contentLength ?? '0', 10);
//     end = end ?? totalLength - 1;
//
//     if (range) {
//       const chunkSize = (end - start) + 1;
//       res.status(206).header({
//         'Content-Range': `bytes ${start}-${end}/${totalLength}`,
//         'Accept-Ranges': 'bytes',
//         'Content-Length': chunkSize.toString(),
//         'Content-Type': 'text/plain', // Sending base64, so use text
//       });
//     } else {
//       res.header({
//         'Content-Length': totalLength.toString(),
//         'Content-Type': 'text/plain', // Sending base64, so use text
//       });
//     }
//
//     // Create a transform stream to convert audio to base64
//     const base64Transform = new Transform({
//       transform(chunk, encoding, callback) {
//         // Convert the chunk to base64 and push to the stream
//         this.push(chunk.toString('base64'));
//         callback();
//       },
//     });
//
//     // Create and pipe the audio stream
//     if (!streamStarted) {
//       const stream = ytdl(videoUrl, {
//         format: audioFormat,
//         range: { start, end }
//       });
//
//       // Pipe the stream through the base64 transformer
//       stream.pipe(base64Transform).pipe(res);
//
//       // Handle errors
//       stream.on('error', (err: Error) => {
//         console.error(`Error streaming audio: ${err.message}`);
//         if (!res.headersSent) {
//           res.status(500).send('Error streaming audio.');
//         }
//       });
//
//       streamStarted = true;
//     }
//
//   } catch (err) {
//     console.error(`Error getting video info: ${(err as Error).message}`);
//     res.status(500).send('Error processing audio.');
//   }
// });
//
// export default streamRouterBase64;




import { Router, Request, Response } from 'express';
import ytdl from '@distube/ytdl-core';
import base58 from 'bs58'; // Base58 encoding library

const streamRouterChunked = Router();

streamRouterChunked.get('/', async (req: Request, res: Response) => {
  const videoId = req.query.videoId as string;

  if (!videoId) {
    return res.status(400).send('Video ID is required.');
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    // Fetch YouTube metadata and the best audio stream
    const info = await ytdl.getInfo(videoUrl);
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    if (!audioFormat) {
      return res.status(404).send('No audio stream found.');
    }

    // Set headers for streaming plain text (encoded audio)
    res.setHeader('Content-Type', 'text/plain');

    // Stream the audio in chunks, encode each chunk using Base58, and send it as text
    const stream = ytdl(videoUrl, { format: audioFormat, highWaterMark: 1 << 10 });

    stream.on('data', (chunk) => {
      // Encode the audio chunk using Base58
      const encodedChunk = base58.encode(chunk);
      res.write(encodedChunk); // Send the encoded text
    });

    stream.on('end', () => {
      res.end(); // End the response when the stream ends
    });

    stream.on('error', (err) => {
      console.error(`Error streaming audio: ${err.message}`);
      if (!res.headersSent) {
        res.status(500).send('Error streaming audio.');
      }
    });
  } catch (err) {
    console.error(`Error processing audio: ${(err as Error).message}`);
    res.status(500).send('Error processing audio.');
  }
});

export default streamRouterChunked;
