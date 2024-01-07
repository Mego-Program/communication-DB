import getChatHistory from "../servises/getHistoryMessages.js";

const chatHistoryMesssages = async (req, res) => {
  const { sender, receiver } = req.query;
  console.log("conect the db to get history chat");
  try {
    console.log("chatHistoryMessages.js:5", sender, receiver)
    const chatHistory = await getChatHistory(sender, receiver);
    console.log("get db complit");
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).send("Error getting chat history");
  }
};
export default chatHistoryMesssages;