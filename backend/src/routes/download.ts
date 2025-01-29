import { Router, Request, Response } from 'express';
import ytdl from '@distube/ytdl-core';

export const downloadRouter = Router();

downloadRouter.get('/', async (req: Request, res: Response) => {
  const videoId = req.query.videoId as string;
  if (!videoId) {
    return res.status(400).send('Video ID is required.');
  }

  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

  try {
    // Fetch metadata
    const info = await ytdl.getInfo(videoUrl);

    // Get the best audio format
    const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

    if (!audioFormat) {
      return res.status(404).send('No audio stream found.');
    }

    // Sanitize the title to create a valid filename
    const sanitizedTitle = info.videoDetails.title.replace(/[^a-zA-Z0-9]/g, '_');
    const filename = `${sanitizedTitle}.mp3`;

    // Set headers to trigger download
    res.header({
      'Content-Type': audioFormat.mimeType,
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': audioFormat.contentLength ?? '0',
    });

    // Create and pipe the audio stream
    const stream = ytdl(videoUrl, {
      format: audioFormat
    });
    stream.pipe(res);

    // Handle errors
    stream.on('error', (err: Error) => {
      console.error(`Error downloading audio: ${err.message}`);
      if (!res.headersSent) {
        res.status(500).send('Error downloading audio.');
      }
    });

  } catch (err) {
    console.error(`Error getting video info: ${(err as Error).message}`);
    res.status(500).send('Error processing audio.');
  }
});

