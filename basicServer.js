import express from "express"
import http from "http"
import { Server } from "socket.io"
import cors from "cors"
const app = express();

app.use(cors());

const httpServer = http.createServer(app); // Use a different variable name, e.g., httpServer

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`)
  
  socket.on("join",(smg)=>{
    console.log(smg);
    socket.join(smg);
  });
  
  socket.on("message",(smg)=>{
    console.log(smg);
    // io.to(smg.room).emit("send", smg)
    io.emit("send", smg)
  });
  
});

const port = 5003

httpServer.listen(port, () => {
  console.log(`server_is_running ${port}`);
});