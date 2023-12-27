const chatConnect = (req, res) => {
  try {
    res
      .status(200)
      .json({
        message:
          "Hello communication-Bnei-Brak Team! This is our Express server.",
      });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default chatConnect;
