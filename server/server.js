require('./config/config');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const PORT = process.env.PORT;

const publicPath = path.join(__dirname, '..', 'public');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage } = require('./utils/message');

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('new user connected');

  socket.emit('newMessage', generateMessage('admin', 'welcome to the chat app!'));

  socket.broadcast.emit('newMessage', generateMessage('admin', 'New user joined to the chat!'));

  socket.on('disconnect', () => {
    console.log('disconnected from server');
  });

  socket.on('createMessage', (message, callback) => {
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the Server');

    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createAt: new Date().getTime()
    // });
  });
});

server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
