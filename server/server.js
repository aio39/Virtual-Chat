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
    console.log('미들웨어', socket.id);
    next();
  });

  socket.on('join_room', (roomName) => {
    console.log(roomName);
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  //  MMD
  socket.on('result_data', (result) => {
    // console.log(result);
    if (result != 0) {
      socket.broadcast.emit('result_download', result);
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
  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
  });
  socket.on('init', (done) => {
    done();
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
