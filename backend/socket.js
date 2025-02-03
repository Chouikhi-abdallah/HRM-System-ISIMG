/*const socketIo = require('socket.io');
let io;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: {
      origin: 'http://localhost:5173', // Make sure this matches your frontend URL
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
};

const getIo = () => io;

module.exports = { initSocket, getIo };*/
