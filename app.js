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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

app.get("/", chatControler); // this need beak up the all chat to pages when the chat is connect

// this save the chat message to the DB when the user send message
app.post("/send/:senderId/:gettingId", chatMessagesController);

// Listens for new connections to the server.
io.on("connection", socketController);

export default server;
export { io };