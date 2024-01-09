const socketController = (socket) => {
  console.log(`user connected: ${socket.id}`);
  let roomId = ""
  socket.on("join", (msg) => {
    roomId = msg
    console.log(`ID Room ${roomId}`);
    socket.join(roomId);
  });

  socket.on("message", (smg) => {
    console.log("line 10", smg);
    console.log(smg.room === roomId);
    socket.to(smg.room).emit("send", smg.newMessage)
  });

  socket.on("leave", () => {
    console.log(`ID Room ${roomId} is closed`);
    socket.leave(roomId);
  });
};

export default socketController;