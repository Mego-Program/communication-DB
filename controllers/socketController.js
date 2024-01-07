const socketController = (socket) => {
  console.log(`user connected: ${socket.id}`);
  let roomId = ""
  socket.on("join", (smg) => {
    roomId = smg
    console.log(`ID Room ${roomId}`);
    socket.join(roomId);
  });

  socket.on("message", (smg) => {
    console.log(smg.room === roomId);
    socket.to(smg.room).emit("send", smg.newMessage)
  });
};

export default socketController;