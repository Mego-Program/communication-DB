import { io } from "../app.js";
import { chat } from "../models/chatSchema.js";
import mongoose from "mongoose";
import connectDB from "../servises/connectDB.js";

let userId = 1;
const updateUserId = () => {
  userId++;
  return userId;
};
const socketController = (socket) => {
  console.log(`User ID - ${socket.id} is connected.`);
  io.emit("message", `Welcom to the chat your id is: ${userId}`); // send a welcome message to all connected clients
  updateUserId(); // Calls a function to update the user's ID

  // Sets up a listener for 'message' events on this socket
  socket.on("message", async (data) => {
    console.log(data);
    try {
      const uri = await connectDB();
      await mongoose.connect(uri);
      const newChat = new chat({ content: data });
      const result = await newChat.save();
      console.log("Saved new chat to MongoDB:", result);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    } finally {
      mongoose.connection.close();
    }
    socket.broadcast.emit("message", `${data}`); // Emits the received message to all connected clients except the one who sent it.
  });

  // Sets up a listener for the 'disconnect' event for this socket
  socket.on("disconnect", () => {
    console.log(`User ID - ${socket.id} is disconnected.`);
  });
};

export default socketController;