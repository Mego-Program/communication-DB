import { chat } from "../models/chatSchema.js";
import connectDB from "../servises/connectDB.js";
import mongoose from "mongoose";

const saveChatToDatabase = async (sender, recipient, content) => {
  try {
    const uri = await connectDB();
    await mongoose.connect(uri);

    const newChat = new chat({
      sender: sender,
      getting: recipient,
      content: content,
    });

    const result = await newChat.save();
    console.log("Saved new chat to MongoDB:", result);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.connection.close();
  }
};

export default saveChatToDatabase;