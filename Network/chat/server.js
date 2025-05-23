const net = require('net');

const server = net.createServer(); //是一个net.Server对象

const clients =[]

// socket 是一个 net.Socket 对象，代表服务器实例传入的客户端连接对象。

// 这里，socket可以是多个的socket对象，代表不同的客户端连接
server.on('connection', (socket) => {
    console.log('New client connected');
    // 每个客户端连接时，都会分配一个唯一的id
    const clientId = clients.length + 1;
    
    // 有人加入时，为聊天室发出提示信息
    clients.map((client)=>{
        //将已有的客户端id写入socket中
        client.socket.write(`User ${client.id} is joined!`);
    })

    socket.write(`id-${clientId}`);
    // 有人连接时，将其加入到clients数组中
    clients.push({id:clientId.toString(), socket});
    
    // socket遇到data事件时，将回调函数入栈事件循环
    socket.on('data', (data) => {
        const dataStr = data.toString('utf-8');
        const id = dataStr.substring(0, dataStr.indexOf('-'));
        const message = dataStr.substring(dataStr.indexOf("-message-") + 9);

        //将消息写在每个客户端中，会触发对应socket的data事件
        clients.map((client)=>{
            client.socket.write(`> User ${id}: ${message}`);
        })
    });

    
    // 有人离开时，为聊天室发出提示信息
    socket.on('end', () => {
        clients.map((client) => {
            client.socket.write(`User ${clientId} left!`);
        });
    });


})

server.listen(3008, "127.0.0.1" ,() => {
    console.log('Server is listening on port 3008',server.address());
})