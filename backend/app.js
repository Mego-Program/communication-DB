import express from "express";
import bodyParser from "body-parser";
import updateChat from "./servises/chatServices.js";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./servises/connectDB.js";

dotenv.config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

connectDB();

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/index.html");
});

app.get("/chat", (req, res) => {
  try {
    const data = req.body;
    const result = updateChat(data);
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default app;
