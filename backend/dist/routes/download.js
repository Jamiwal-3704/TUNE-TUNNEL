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
exports.downloadRouter = void 0;
const express_1 = require("express");
const ytdl_core_1 = __importDefault(require("@distube/ytdl-core"));
exports.downloadRouter = (0, express_1.Router)();
exports.downloadRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const videoId = req.query.videoId;
    if (!videoId) {
        return res.status(400).send('Video ID is required.');
    }
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    try {
        // Fetch metadata
        const info = yield ytdl_core_1.default.getInfo(videoUrl);
        // Get the best audio format
        const audioFormat = ytdl_core_1.default.chooseFormat(info.formats, { quality: 'highestaudio' });
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
            'Content-Length': (_a = audioFormat.contentLength) !== null && _a !== void 0 ? _a : '0',
        });
        // Create and pipe the audio stream
        const stream = (0, ytdl_core_1.default)(videoUrl, {
            format: audioFormat
        });
        stream.pipe(res);
        // Handle errors
        stream.on('error', (err) => {
            console.error(`Error downloading audio: ${err.message}`);
            if (!res.headersSent) {
                res.status(500).send('Error downloading audio.');
            }
        });
    }
    catch (err) {
        console.error(`Error getting video info: ${err.message}`);
        res.status(500).send('Error processing audio.');
    }
}));
