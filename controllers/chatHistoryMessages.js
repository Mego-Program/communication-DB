import getChatHistory from "../servises/getHistoryMessages.js";

const chatHistoryMesssages = async (req, res) => {
  const { senderId, gettingId } = req.params;
  try {
    const chatHistory = await getChatHistory(senderId, gettingId);
    res.status(200).json(chatHistory);
  } catch (error) {
    res.status(500).send("Error getting chat history");
  }
};
export default chatHistoryMesssages;
