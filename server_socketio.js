// Import required modules
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

// Create an Express app
const app = express();

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create a Socket.io instance attached to the server
const io = new Server(server);

// Define a route for the root endpoint
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Define a connection event for Socket.io
io.on('connection', (socket) => {
  console.log('A client connected');

  // Define events for communication
  socket.on('message', (data) => {
    console.log(`Received message: ${data}`);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Define a disconnect event
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});


// Set the server to listen on a specific port
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});