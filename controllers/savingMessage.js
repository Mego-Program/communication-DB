import { Chat } from "../models/chatSchema.js";
import connectDB from "../services/connectDB.js";

const saveChatToDatabase = async (sender, recipient, content) => {
  try {
    const uri = await connectDB();
    await mongoose.connect(uri);

    const newChat = new Chat({
      sender: sender,
      recipient: recipient,
      content: content
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

