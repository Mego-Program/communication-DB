import { Server } from "socket.io";
import { createServer } from "node:http";
import { chat } from "../models/chatSchema.js";

import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const server = createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("chat message", async (msg) => {
    io.emit("chat message", msg);
    console.log("message: " + msg);
    try {
      await mongoose.connect(await connectToDatabase());
      const newChat = new chat({ content: msg });
      const result = await newChat.save();
      console.log("Saved new chat to MongoDB:", result);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    } finally {
      mongoose.connection.close();
    }
  });
});
