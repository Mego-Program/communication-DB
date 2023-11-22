import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: new Date()
  },
});

export const chat = mongoose.model("ToDo", chatSchema, "chat");
