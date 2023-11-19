import express from "express";
import http from "http";
import cors from "cors";
import morgan from "morgan"; // Log request to console
import { Server } from "socket.io";
const app = express();
const port = 3011;

app.options("*", cors());
app.use(morgan("dev"));

// Create an HTTP server using the Express app
const server = http.createServer(app);

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});

app.post("/register", (req, res) => {
  //Do something with the data
  console.log(req.body);
  res.sendStatus(201);
});

app.put("/user/myname", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/myname", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/myname", (req, res) => {
  //Deleting
  res.sendStatus(200);
});

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

// const wsPort = process.env.PORT || 3006;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Create a Socket.io instance attached to the server
const io = new Server(server);

// Define a connection event for Socket.io
io.on("connection", (socket) => {
  console.log("A client connected");
  socket.emit("message", "Welcome to the chat");

  // Define events for communication
  socket.on("message", (data) => {
    console.log(`Received message: ${data}`);

    // Broadcast the message to all connected clients except the sender
    socket.broadcast.emit("message", data);
  });

  // Define a disconnect event
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});
