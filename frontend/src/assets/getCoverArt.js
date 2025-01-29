// import axios from "axios";
const axios = require("axios");
async function fetchMBID(songName, artistName) {
  try {
    const response = await axios.get(
      `https://musicbrainz.org/ws/2/recording/?query=artist:"${artistName}" AND recording:"${songName}"&fmt=json`
    );
    // const response = await axios.get(
    //   "https://musicbrainz.org/ws/2/recording/?query=artist:Benson%20Boone%20AND%20recording:Beautiful%20Things&fmt=json"
    // );
    // console.log(response.data.recordings[0].releases[0].id);
    if (
      response.data.recordings[0].releases &&
      response.data.recordings[0].releases.length > 0
    ) {
      return response.data.recordings[0].releases[0].id;
    }
  } catch (error) {
    // console.log("Error fetching MBID:");
  }
  return null;
}
// fetchMBID("Beautiful Things", "Benson Boone").then((mbid) => {
//   console.log("MBID:", mbid);
//   fetchCoverArt(mbid).then((imageUrl) => {
//     console.log("Cover Art URL:", imageUrl);
//   });
// });

async function fetchCoverArt(mbid) {
  try {
    const response = await axios.get(
      `https://coverartarchive.org/release/${mbid}/front-250.jpg`
    );
    // console.log(`https://coverartarchive.org/release/${mbid}/front-250.jpg`);
    // console.log(response.data.res.responseUrl);
    return response.request.res.responseUrl; // URL of the image
  } catch (error) {
    // console.log("Error fetching cover art:");
  }
  return null;
}

async function getCoverArt(songName, artistName) {
  const mbid = await fetchMBID(songName, artistName);
  const imageUrl = await fetchCoverArt(mbid);
  return imageUrl;
}

// getCoverArt("Made For Me", "Muni Long").then((imageUrl) => {
//   console.log("image: " + imageUrl);
// });

module.exports = { getCoverArt };
