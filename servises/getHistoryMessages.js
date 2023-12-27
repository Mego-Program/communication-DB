import { chat } from "../models/chatSchema.js";
import connectDB from "./connectDB.js";
import mongoose from "mongoose";

const getChatHistory = async (user1, user2) => {
  const uri = await connectDB();
  await mongoose.connect(uri);
  const chatHistory = await chat
    .find({
      $or: [
        { sender: user1, getting: user2 },
        { sender: user2, getting: user1 },
      ],
    })
    .sort({ timestamp: 1 });
  mongoose.connection.close();
  return chatHistory;
};

export default getChatHistory;
