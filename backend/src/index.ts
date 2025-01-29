import express from "express";
import cors from "cors";
import { signInRouter } from "./routes/signin";
import { downloadRouter } from "./routes/download";
import { lyricsRouter } from "./routes/lyrics";
import { searchRouter } from "./routes/search";
import { signUpRouter } from "./routes/signup";
import streamRouter from "./routes/stream";
import streamRouterChunked from "./routes/streamBase64";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/download", downloadRouter);
app.use("/api/v1/lyrics", lyricsRouter);
app.use("/api/v1/search", searchRouter);
app.use("/api/v1/signin", signInRouter);
app.use("/api/v1/signup", signUpRouter);
app.use("/api/v1/stream", streamRouter);
app.use('/api/v1/streamBinary', streamRouterChunked);


app.listen(3001);

console.log("Server is listening on port 3001");

