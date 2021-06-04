const io = require('socket.io')();

const PORT = process.env.PORT || 5000;

io.listen(PORT);

const messages = [];

io.on('connection', (client) => {
    console.log('Hello new client');
    client.emit('messages', messages)
    client.on('message', (text) => {
        messages.push({
            text
        })
        io.emit('messages', messages)
    })
})

console.log('Socket is listening on port ' + PORT)
