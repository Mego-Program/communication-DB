import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: true
  },
  gettingId: {
    type: String,
    required: true
  },
  senderFirstName: {
    type: String,
    required: true
  },
  senderLastName: {
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
