const express = require('express');
const http = require('http')
const path = require('path');
const socketIo = require('socket.io');

const MAX_MESSAGE_HISTORY = 1000;

const app = express();
const server = http.Server(app);
const io = socketIo(server);

let history = [];

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('history', history);

    socket.on('disconnect', () => {
        console.log('user disconnected');
        
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
        
        if (history.length > MAX_MESSAGE_HISTORY) {
          history = []
        }

        history.push(msg);
        console.log(history.toString());
    });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log('listening on: ' + port.toString());
});
/*

http.createServer(function (request, response) {
    console.log('New connection');
    userCount++;

    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Hello!\n');
    response.write('We have had '+userCount+' visits!\n');
    response.end();
}).listen(port);

console.log('Server started');
*/
