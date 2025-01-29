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
exports.searchRouter = void 0;
const express_1 = __importDefault(require("express"));
const ytmusic_api_1 = __importDefault(require("ytmusic-api"));
const ytmusic = new ytmusic_api_1.default();
exports.searchRouter = express_1.default.Router();
exports.searchRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.searchSongs(req.query.q);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
exports.searchRouter.get('/videos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.searchVideos(req.query.q);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
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
exports.searchRouter.get('/lyrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.getLyrics(req.query.q);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
exports.searchRouter.get('/artist/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.getArtist(req.params.id);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
exports.searchRouter.get('/songDetail/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.getSong(req.params.id);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
exports.searchRouter.get('/album/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.getAlbum(req.params.id);
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
exports.searchRouter.get('/homepage', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield ytmusic.initialize();
        const info = yield ytmusic.getHomeSections();
        res.status(200).send(info);
    }
    catch (err) {
        if (err instanceof Error && err.message.includes("initialize")) {
            res.status(500).send(`Failed to initialize ytmusic: ${err.message}`);
        }
        else {
            res.status(403).send(err);
        }
    }
}));
