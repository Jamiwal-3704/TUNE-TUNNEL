"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lyricsRouter = void 0;
const express_1 = __importDefault(require("express"));
const ytmusic_api_1 = __importDefault(require("ytmusic-api"));
const axios_1 = __importDefault(require("axios"));
const ytmusic = new ytmusic_api_1.default();
exports.lyricsRouter = express_1.default.Router();
exports.lyricsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const songs = yield axios_1.default.get(`https://lrclib.net/api/search?q=${track_name}+${artist_name}`);
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
                }
                else {
                    if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
                        return res.json({ lyrics: song.plainLyrics });
                    }
                }
            }
        }
        // If no matching song is found, send a 404 response
        return res.status(404).json({ msg: "No matching song found" });
    }
    catch (err) {
        console.log("Inside catch block");
        if (err instanceof Error && err.message.includes("initialize")) {
            return res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            console.log(err);
            return res.status(403).json({ msg: err });
        }
    }
}));
exports.lyricsRouter.get("/synced", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let artist_name = req.body.artist_name;
    let track_name = req.body.track_name;
    const duration = req.body.duration;
    try {
        const songs = yield axios_1.default.get(`https://lrclib.net/api/search?q=${track_name}+${artist_name}`);
        for (const song of songs.data) {
            if (song.name.includes(track_name, 0) || track_name.includes(song.name, 0)) {
                console.log("track name match found");
                console.log(song.artistName);
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
                }
                else {
                    if ((song.duration - 2) <= duration && duration <= (song.duration + 2)) {
                        // console.log(song);
                        return res.json({ lyrics: song.syncedLyrics });
                    }
                }
            }
        }
        // If no matching song is found, send a 404 response
        return res.status(404).json({ msg: "No matching song found" });
    }
    catch (err) {
        console.log("Inside catch block");
        if (err instanceof Error && err.message.includes("initialize")) {
            return res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            console.log(err);
            return res.status(403).json({ msg: err });
        }
    }
}));
