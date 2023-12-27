/**
 * An Express middleware function that saves a chat message to the database.
 * 
 * @param {Object} req - The Express request object.
 * @param {Object} res - The Express response object.
 * 
 * The request object should have the following structure:
 * - params: An object with the following properties:
 *   - senderId: The ID of the sender of the message.
 *   - gettingId: The ID of the recipient of the message.
 * - body: An object with the following properties:
 *   - mas: The message to be saved.
 * 
 * If the message is saved successfully, the function sends a response with a status code of 200 and a message of "Message saved to DB".
 * If there is an error, the function sends a response with a status code of 500 and a message of "Error saving message to DB".
 */
import saveChatToDatabase from "../servises/savingMessage.js";
import socketController from "./socketController.js";  

const saveMessage = async (req, res) => {
  const { senderId, gettingId } = req.params;
  const { mas } = req.body;
  try {
    await saveChatToDatabase(senderId, gettingId, mas);
    // Listens for new connections to the server.
    // io.on("connection", socketController);
    res.status(200).send("Message saved to DB");
  } catch (error) {
    res.status(500).send("Error saving message to DB");
  }
};

export default saveMessage;
