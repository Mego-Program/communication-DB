import express from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import mongoose from "mongoose";
import { chat } from "./Chat.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const server = createServer(app);
const io = new Server(server);
const port = 3005;

const connectToDatabase = async () => {
  const userName = "ShmuelRoth";
  const password = "mh881999";
  const cluster = "@cluster0.gbn9blz.mongodb.net/ToDo?retryWrites=true&w=majority";
  const connectionURI = `mongodb+srv://${userName}:${password}${cluster}`;
  console.log({ connectionURI })
  return connectionURI;
};

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

app.post("/", async (req, res) => {
  const newChat = new chat({
    content: req.body.content,
    date: req.body.date
  });
  try {
    await mongoose.connect(await connectToDatabase());
    const result = await newChat.save();
    console.log("Saved new chat to MongoDB:", result);
    return res.json(result);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.connection.close();
  } 
});

server.listen(port, () => {
console.log(`server running at http://localhost:${port}`);
});