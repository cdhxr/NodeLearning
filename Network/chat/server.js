const net = require('net');

const server = net.createServer(); //是一个net.Server对象

const clients =[]

// socket 是一个 net.Socket 对象，代表服务器实例传入的客户端连接对象。

// 这里，socket可以是多个的socket对象，代表不同的客户端连接
server.on('connection', (socket) => {
    console.log('New client connected');
    
    // socket遇到data事件时，将回调函数入栈事件循环
    socket.on('data', (data) => {
        //data是一个Buffer对象，所以要转换成字符串
        clients.map((s)=>{
            s.write(data);
        })
        clients.push(socket);
    });

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