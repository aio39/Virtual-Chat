import cors from 'cors';
import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
require('dotenv').config();
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const app = express();

app.use(cors());
app.use('/public', express.static(__dirname + '/public'));

app.use('/', express.static(path.join(__dirname, 'dist')));
app.get('/api/test', (_, res) => {
  res.json({ test: 'success' });
});
app.get('*', (_, res) =>
  res.sendFile(path.join(__dirname, '/dist/index.html'))
);

const pubClient = createClient({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});
const subClient = pubClient.duplicate();

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: '*',
    // method: ['GET', 'POST'],
  },
});

wsServer.adapter(createAdapter(pubClient, subClient));

wsServer.on('connection', (socket) => {
  const transport = socket.conn.transport.name; // in most cases, "polling"
  console.log('socket', transport, socket.id);
  socket.use((socket, next) => {
    next();
  });

  socket.on('join_room', async (roomName, name, avatar) => {
    socket.aData = { name, avatar, roomName };

    const peerSockets = await wsServer.in(roomName).fetchSockets();
    const peerList = peerSockets
      .map((socket) => ({
        name: socket.aData.name,
        avatar: socket.aData.avatar,
      }))
      .filter((data) => data.name !== name);
    console.log(peerList, name);
    socket.join(roomName);

    socket.emit('getPeerList', peerList);
    socket.to(roomName).emit('welcome', name, avatar);
  });
  // for text chat
  socket.on('sendMessage', (message) => {
    socket
      .to(socket.aData.roomName)
      .emit('getChatMessage', socket.aData.name, message);
  });

  // for py server
  socket.on('join_py_room', (roomName) => {
    console.log('py', roomName);
    socket.roomName = roomName;
    socket.join(roomName + 'py');

    const count = wsServer.sockets.adapter.rooms.get(roomName + 'py').size;

    socket.emit('return_py_order', count);
  });

  //  MMD
  socket.on('result_data', (result) => {
    console.log(result.name);
    if (result != 0) {
      const { room, name, result_string, start_time } = result;
      socket.to(room).emit('result_download', name, result_string, start_time);
    }
  });

  // WEB RTC
  socket.on('offer', (offer, roomName) => {
    console.log('offer');
    socket.to(roomName).emit('offer', offer);
  });
  socket.on('answer', (answer, roomName) => {
    console.log('answer');
    socket.to(roomName).emit('answer', answer);
  });
  socket.on('ice', (ice, roomName) => {
    console.log('ice');
    socket.to(roomName).emit('ice', ice);
  });

  //  Default
  socket.on('disconnecting', async function () {
    const peerSockets = await wsServer.in(socket.rooms).fetchSockets();
    const peerList = peerSockets
      .map((socket) => ({
        name: socket.aData.name,
        avatar: socket.aData.avatar,
      }))
      .filter((data) => data.name !== socket.aData.name);

    socket.to(socket.rooms).emit('getPeerList', peerList);
  });
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
  });
  socket.on('init', (done) => {
    done();
  });
});

const handleListen = () => console.log(`Listening ! PORT: ${process.env.PORT}`);
httpServer.listen(process.env.PORT || 80, handleListen);
