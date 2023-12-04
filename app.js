import exspress from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import chatControler from "./controllers/chatController.js";
import socketController from "./controllers/socketController.js";
import connectDB from "./servises/connectDB.js";

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

app.get("/", chatControler);

const usersId = {
  chatID: 2,
  users: {
    user1: "userID",
    messege: [{ conntect: "test", time: "13:00" }],
    user2: "userID",
    messege: [{ conntect: "test", time: "13:00" }],
  },
};
app.get("/chat/:chatid", (req, res) => {
  const { chatid } = req.params;
  console.log(chatid);
  res
    .status(200)
    .json({chat: usersId});
});

// Listens for new connections to the server.
io.on("connection", socketController);

export default server;
export { io };