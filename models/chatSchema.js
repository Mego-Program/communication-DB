import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  getting: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date()
  }
});

export const chat = mongoose.model("ToDo", chatSchema, "chat");
