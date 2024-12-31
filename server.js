const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
    console.log('A new player has connected!');

    socket.on('message', (message) => {
        console.log(`Received: ${message}`);
        socket.send(`Server says: ${message}`);
    });

    socket.on('close', () => {
        console.log('A player has disconnected.');
    });
});

console.log('Game server is running on ws://localhost:8080');
