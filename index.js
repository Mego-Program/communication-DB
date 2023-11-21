import mongoose from "mongoose";
import { chat } from "./Chat.js";


const connectToDatabase = async () => {
  const userName = "ShmuelRoth";
  const password = "mh881999";
  const cluster = "@cluster0.gbn9blz.mongodb.net/ToDo?retryWrites=true&w=majority";
  const connectionURI = `mongodb+srv://${userName}:${password}${cluster}`;
  console.log({ connectionURI })
  return connectionURI;
};

async function run() {
  try {
    await mongoose.connect(await connectToDatabase());
    console.log("Connected to MongoDB!");
    

    const newChat = new chat({ content: "dsts" });
    await newChat.save();
    console.log(newChat);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    mongoose.connection.close();
  }
}

run();
