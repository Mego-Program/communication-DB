import saveChatToDatabase from "../servises/savingMessage.js";

const saveMessage = async (req, res) => {
  const {text, firstName, lastName, userId, selectedUserId}  = req.body;
  try {
    await saveChatToDatabase(userId, selectedUserId["*"], firstName, lastName, text);
    // Listens for new connections to the server.
    res.status(200).send("Message saved to DB");
  } catch (error) {
    res.status(500).send("Error saving message to DB");
  }
};

export default saveMessage;