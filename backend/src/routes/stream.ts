import { Router, Request, Response } from 'express';
import ytdl from '@distube/ytdl-core';

const streamRouter = Router();

streamRouter.get('/', async (req: Request, res: Response) => {
  const videoId = req.query.videoId as string;
  if (!videoId) {
    return res.status(400).send('Video ID is required.');
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    // Start fetching metadata and stream in parallel
    const infoPromise = ytdl.getInfo(videoUrl);

    let streamStarted = false;

    // Handle range headers
    const range = req.headers.range;
    let start = 0;
    let end: number | undefined;
    let totalLength: number;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      start = parseInt(parts[0], 10);
    }

    // Wait for metadata to be fetched
    const info = await infoPromise;

    // Get the best audio format
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    if (!audioFormat) {
      return res.status(404).send('No audio stream found.');
    }

    totalLength = parseInt(audioFormat.contentLength ?? '0', 10);
    end = end ?? totalLength - 1;

    if (range) {
      const chunkSize = (end - start) + 1;
      res.status(206).header({
        'Content-Range': `bytes ${start}-${end}/${totalLength}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize.toString(),
        'Content-Type': audioFormat.mimeType,
      });
    } else {
      res.header({
        'Content-Length': totalLength.toString(),
        'Content-Type': audioFormat.mimeType,
      });
    }

    // Create and pipe the audio stream
    if (!streamStarted) {
      const stream = ytdl(videoUrl, {
        format: audioFormat,
        range: { start, end }
      });
      stream.pipe(res);

      // Handle errors
      stream.on('error', (err: Error) => {
        console.error(`Error streaming audio: ${err.message}`);
        if (!res.headersSent) {
          res.status(500).send('Error streaming audio.');
        }
      });

      streamStarted = true;
    }

  } catch (err) {
    console.error(`Error getting video info: ${(err as Error).message}`);
    res.status(500).send('Error processing audio.');
  }
});

export default streamRouter;
