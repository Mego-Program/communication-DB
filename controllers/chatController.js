const chatController = async (req, res) => {
  try {
    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default chatController;
