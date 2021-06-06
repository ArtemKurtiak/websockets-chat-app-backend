const http = require("http");

const socketio = require('socket.io')

const express = require('express');



// const basicRouter = express.Router();
//
// basicRouter.get('/', (req, res) => {
//     res.status(200).json({})
// });
//
// app.use(basicRouter)


const PORT = process.env.PORT || 5000;
const server = http.createServer().listen(5000)


// const app = express();
const io = socketio(server, {
    origin: '*'
});

const groups = [{name: "Test", id: 'sdddcdfj77ct5sdcbdm-7dvcjn.dfv'}, {
    name: 'Test1',
    id: 'shudyfhbshgdgfbsfgnvsndhf663646gjmefh'
}];

const messages = [];

io.on('connection', (socket) => {
    socket.emit('groups', groups);
    socket.on('join', ({name, roomId}) => {
        socket.join(roomId)
        socket.on('chatMessage', msg => {
            console.log(msg)
            messages.push({text: msg, id: roomId})
            io.to(roomId).emit('message', {text: msg});
            io.to(roomId).emit('setMessages', {messages: [...messages.filter(el => el.id == roomId)]})
        });
        socket.on('getMessages', () => {
            io.to(roomId).emit('setMessages', {messages: [...messages.filter(el => el.id == roomId)]})
        })

    })
});


console.log('Socket is listening on port ' + PORT)
