import exspress from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import chatControler from "./controllers/chatController.js";
import socketController from "./controllers/socketController.js";
// import connectDB from "./servises/connectDB.js";
import chatMessagesController from "./controllers/chatMessages.js";
import saveChatToDatabase from "./controllers/savingMessage.js";

dotenv.config(); // Load(לטעון) info from .env file
const app = exspress();

app.get("/", (req, res) => {
  res.send("Hello communication-Bnei-Brak Team! This is our Express server.");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// connectDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// app.get("/", chatControler); // this need beak up the all chat to pages when the chat is connect

// this save the chat message to the DB when the user send message
app.post("/send/:senderId/:gettingId", async (req, res) => {
  const { senderId, gettingId } = req.params;
  const { mas } = req.body;
  console.log(mas);
  try {
    await saveChatToDatabase(senderId, gettingId, mas);
    // Listens for new connections to the server.
    io.on("connection", socketController);
    res.status(200).send("Message saved to DB");
  } catch (error) {
    res.status(500).send("Error saving message to DB");
  }
});

export default server;
export { io };
