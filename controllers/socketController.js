import { io } from "../index.js";
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

  // Sets up a listener for 'message' events on this socket
  socket.on("message", async (data) => {
    console.log(data);

    // Call updateUserId when a message is received
    updateUserId();

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

    io.emit("message", ` ${data}`);
  });

  // Sets up a listener for the 'disconnect' event for this socket
  socket.on("disconnect", () => {
    console.log(`User ID - ${socket.id} is disconnected.`);
  });
};

export default socketController;
