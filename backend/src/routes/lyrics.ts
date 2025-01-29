import express from "express";
import YTMusic from 'ytmusic-api';
import axios from "axios";

const ytmusic = new YTMusic();

export const lyricsRouter = express.Router();

lyricsRouter.post("/", async (req, res) => {
  let artist_name = req.body.artist_name;
  let track_name = req.body.track_name;
  const duration = req.body.duration;
  // artist_name = artist_name.replaceAll(" ", "+");
  // track_name = track_name.replaceAll(" ", "+");
  // console.log(artist_name);
  // console.log(track_name);
  // console.log(duration);
  // if (!videoId) {
  //   return res.status(400).send('Video ID is required.');
  // }
  // console.log(`https://lrclib.net/api/search?q=${track_name}+${artist_name}`);
  try {
    const songs = await axios.get(`https://lrclib.net/api/search?q=${track_name}+${artist_name}`);

    for (const song of songs.data) {
      console.log(track_name);
      // console.log(song.name);
      if (song.name.includes(track_name, 0) || track_name.includes(song.name, 0)) {
        if (artist_name && song.artist) {
          if (song.artist.includes(artist_name, 0) || artist_name.includes(song.artist, 0)) {
            if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
              return res.status(200).json({ lyrics: song.plainLyrics });
            }
          }
        } else {
          if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
            return res.json({ lyrics: song.plainLyrics });
          }
        }
      }
    }

    // If no matching song is found, send a 404 response
    return res.status(404).json({ msg: "No matching song found" });
  } catch (err) {
    console.log("Inside catch block");
    if (err instanceof Error && err.message.includes("initialize")) {
      return res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      console.log(err);
      return res.status(403).json({ msg: err });
    }
  }
});

lyricsRouter.get("/synced", async (req, res) => {
  let artist_name = req.body.artist_name;
  let track_name = req.body.track_name;
  const duration = req.body.duration;
  try {
    const songs = await axios.get(`https://lrclib.net/api/search?q=${track_name}+${artist_name}`);

    for (const song of songs.data) {
      if (song.name.includes(track_name, 0) || track_name.includes(song.name, 0)) {
        console.log("track name match found");
        console.log(song.artistName)
        if (artist_name && song.artistName) {
          console.log("artist_name and artistName exists");
          if (song.artistName.includes(artist_name, 0) || artist_name.includes(song.artistName, 0)) {
            console.log("artist name match found");
            if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
              console.log("duration match found");
              // console.log(song);
              return res.status(200).json({ lyrics: song.syncedLyrics });
            }
          }
        } else {
          if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
            // console.log(song);
            return res.json({ lyrics: song.syncedLyrics });
          }
        }
      }
    }

    // If no matching song is found, send a 404 response
    return res.status(404).json({ msg: "No matching song found" });
  } catch (err) {
    console.log("Inside catch block");
    if (err instanceof Error && err.message.includes("initialize")) {
      return res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
    } else {
      console.log(err);
      return res.status(403).json({ msg: err });
    }
  }
});
