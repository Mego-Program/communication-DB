import saveChatToDatabase from "../servises/savingMessage.js";

const saveMessage = async (req, res) => {
  const {text, local_user, selectedUserId}  = req.body;
  try {
    await saveChatToDatabase(local_user, selectedUserId["*"], text);
    // Listens for new connections to the server.
    res.status(200).send("Message saved to DB");
  } catch (error) {
    res.status(500).send("Error saving message to DB");
  }
};

export default saveMessage;