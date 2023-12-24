import exspress from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import chatControler from "./controllers/chatController.js";
import socketController from "./controllers/socketController.js";
import connectDB from "./servises/connectDB.js";
import chatMessagesController from "./controllers/chatMessagesController.js";

dotenv.config(); // Load(לטעון) info from .env file
const app = exspress();

app.get('/', (req, res) => {
    res.send('Hello communication-Bnei-Brak Team! This is our Express server.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://communication-bb.vercel.app',
  },
});

app.get("/", chatControler);

app.get("/chat/:chatid", chatMessagesController);

// Listens for new connections to the server.
io.on("connection", socketController);

export default server;
export { io };
