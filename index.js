import exspress from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import saveMessage from "./controllers/saveMessages.js";
import chatHistoryMesssages from "./controllers/chatHistoryMessages.js";
import chatConnect from "./controllers/chatConnect.js";
import socketController from "./controllers/socketController.js";

dotenv.config(); // Load(לטעון) info from .env file
const app = exspress();

app.get("/", chatConnect);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// this beak up the all chat by id sender and getting to the pages when the chat is connect
app.get("/chat", chatHistoryMesssages);

// this save the chat message to the DB when the user send message
app.post("/send", saveMessage);

io.on("connection", socketController);

export default server;