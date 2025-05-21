const net = require('net');

const client =  net.createConnection({host:"127.0.0.1",port:3008},()=>{
    console.log('Connected to server');
}); //是一个net.socket对象

// net.createConnection(options[, connectListener])
// net.createConnection(path[, connectListener]) for IPC connections.
// net.createConnection(port[, host][, connectListener]) for TCP connections.

client.on("end",()=>{
    console.log("ended!");
})


