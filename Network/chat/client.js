const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    // terminal: true
});

const socket =  net.createConnection({host:"127.0.0.1",port:3008},()=>{
    console.log('Connected to server');
    // 1. 利用readline模块获取命令行输入
    const message = rl.question("Enter a messsage:");
    // 2. 将message的Buffer，write到socket中，socket是一个duplex流
    socket.write(message);
}); //是一个net.socket对象

// net.createConnection(options[, connectListener])
// net.createConnection(path[, connectListener]) for IPC connections.
// net.createConnection(port[, host][, connectListener]) for TCP connections.

socket.on("data",(data)=>{
    // data是一个Buffer对象，所以要转换成字符串
    console.log(data.toString());
})

socket.on("end",()=>{
    console.log("ended!");
})


