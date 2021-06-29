const express = require('express');
const http = require('http');
const socketio = require('socket.io');;
const router = require('./router');
const helper = require('./helpers');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
    cors: {
        origins: '*'
    }
});

app.use(router);

io.on('connection', (socket) => {
    console.log("a new connection just showed up");

    socket.on('join', (roomCode, userName) => {
        const {error, user} = helper.createUser({ id: socket.id, userName: userName, room: roomCode});

        socket.join(roomCode);

        socket.to(roomCode).emit('welcome', `${user.name} just joined`);
    });

    socket.on('message',  ({text, room, sender}) => {
        console.log(room, text)
        socket.to(room).emit('messagerecv', {id: sender, text: `${text}`});
    });

    socket.on('disconnect', () => {
        console.log('a User just left');
    });
});

server.listen(process.env.PORT || 5000, () => console.log('server started on 5000'));