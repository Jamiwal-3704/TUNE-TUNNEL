import express, { Request, Response } from 'express';
import YTMusic from 'ytmusic-api';

const ytmusic = new YTMusic();
export const searchRouter = express.Router();

searchRouter.get('/', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.searchSongs(req.query.q as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

searchRouter.get('/videos', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.searchVideos(req.query.q as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

// searchRouter.get('/artists', async (req: Request, res: Response) => {
//   try {
//     await ytmusic.initialize();
//     const info = await ytmusic.searchArtists(req.query.q as string);
//     res.status(200).send(info);
//   } catch (err) {
//     if (err instanceof Error && err.message.includes("initialize")) {
//       res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
//     } else {
//       res.status(403).send(err);
//     }
//   }
// });

// searchRouter.get('/search', async (req: Request, res: Response) => {
//   try {
//     await ytmusic.initialize();
//     const info = await ytmusic.search(req.query.q as string);
//     res.status(200).send(info);
//   } catch (err) {
//     if (err instanceof Error && err.message.includes("initialize")) {
//       res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
//     } else {
//       res.status(403).send(err);
//     }
//   }
// });

searchRouter.get('/lyrics', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.getLyrics(req.query.q as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

searchRouter.get('/artist/:id', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.getArtist(req.params.id as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

searchRouter.get('/songDetail/:id', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.getSong(req.params.id as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

searchRouter.get('/album/:id', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.getAlbum(req.params.id as string);
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});


searchRouter.get('/homepage', async (req: Request, res: Response) => {
  try {
    await ytmusic.initialize();
    const info = await ytmusic.getHomeSections();
    res.status(200).send(info);
  } catch (err) {
    if (err instanceof Error && err.message.includes("initialize")) {
      res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      res.status(403).send(err);
    }
  }
});

