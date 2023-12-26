const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatapp', { useNewUrlParser: true, useUnifiedTopology: true });

const Message = mongoose.model('Message', {
  sender: String, 
  receiver: String,
  content: String, 
  timestamp: { type: Date, default: Date.now } 
});

async function sendMessage(sender, receiver, content) {
  const newMessage = new Message({ sender, receiver, content });
  await newMessage.save();
}

async function getChatHistory(user1, user2) {
  const chatHistory = await Message.find({
    $or: [
      { sender: user1, receiver: user2 },
      { sender: user2, receiver: user1 }
    ]
  }).sort({ timestamp: 1 }); 
  return chatHistory;
}
