import cors from 'cors';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
const app = express();

app.use(cors());
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
  cors: {
    origin: '*',
    // method: ['GET', 'POST'],
  },
});

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

  socket.on('disconnect', function () {
    console.log('user disconnected: ', socket.id);
  });
  socket.on('init', (done) => {
    done();
  });
});

const handleListen = () => console.log(`Listening on http://localhost:3001`);
httpServer.listen(3001, handleListen);
