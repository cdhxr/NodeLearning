const net = require('net');

const server = net.createServer(); //是一个net.Server对象

server.on('connection', (socket) => {
    console.log('New client connected');
    // socket.write('Welcome to the chat server!\n');

    // socket.on('data', (data) => {
    //     console.log(`Received: ${data}`);
    //     socket.write(`You said: ${data}`);
    // });

    // socket.on('end', () => {
    //     console.log('Client disconnected');
    // });

    // socket.on('error', (err) => {
    //     console.error(`Socket error: ${err}`);
    // });
})

server.listen(3008, "127.0.0.1" ,() => {
    console.log('Server is listening on port 30S08',server.address());
})