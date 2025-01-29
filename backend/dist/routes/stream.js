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
const express_1 = require("express");
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
const streamRouter = (0, express_1.Router)();
streamRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).send('Video ID is required.');
    }
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
        // Start fetching metadata and stream in parallel
        const infoPromise = ytdl_core_1.default.getInfo(videoUrl);
        let streamStarted = false;
        // Handle range headers
        const range = req.headers.range;
        let start = 0;
        let end;
        let totalLength;
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            start = parseInt(parts[0], 10);
        }
        // Wait for metadata to be fetched
        const info = yield infoPromise;
        // Get the best audio format
        const audioFormat = ytdl_core_1.default.chooseFormat(info.formats, { quality: 'highestaudio' });
        if (!audioFormat) {
            return res.status(404).send('No audio stream found.');
        }
        totalLength = parseInt((_a = audioFormat.contentLength) !== null && _a !== void 0 ? _a : '0', 10);
        end = end !== null && end !== void 0 ? end : totalLength - 1;
        if (range) {
            const chunkSize = (end - start) + 1;
            res.status(206).header({
                'Content-Range': `bytes ${start}-${end}/${totalLength}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize.toString(),
                'Content-Type': audioFormat.mimeType,
            });
        }
        else {
            res.header({
                'Content-Length': totalLength.toString(),
                'Content-Type': audioFormat.mimeType,
            });
        }
        // Create and pipe the audio stream
        if (!streamStarted) {
            const stream = (0, ytdl_core_1.default)(videoUrl, {
                format: audioFormat,
                range: { start, end }
            });
            stream.pipe(res);
            // Handle errors
            stream.on('error', (err) => {
                console.error(`Error streaming audio: ${err.message}`);
                if (!res.headersSent) {
                    res.status(500).send('Error streaming audio.');
                }
            });
            streamStarted = true;
        }
    }
    catch (err) {
        console.error(`Error getting video info: ${err.message}`);
        res.status(500).send('Error processing audio.');
    }
}));
exports.default = streamRouter;
