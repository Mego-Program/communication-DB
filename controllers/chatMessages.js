import { chat } from "../models/chatSchema.js";
const usersId = {
  2: {
    users: {
      user1: "userID",
      message: [{ content: "test", time: "13:00" }],
      user2: "userID",
      message: [{ content: "test", time: "13:00" }],
    },
  },
  3: {
    users: {
      user3: "userID",
      message: [{ content: "test", time: "13:00" }],
      user4: "userID",
      message: [{ content: "test", time: "13:00" }],
    },
  },
  4: {
    users: {
      user5: "userID",
      message: [{ content: "test", time: "13:00" }],
      user6: "userID",
      message: [{ content: "test", time: "13:00" }],
    },
  },
};

const chatMesssagesControler = (req, res) => {
    const { chatid } = req.params;
    const chatData = usersId[chatid];
    if (chatData) {
    res.status(200).json(chatData);
  } else {
    res.status(404).send("Chat not found");
  }
};
export default chatMesssagesControler;