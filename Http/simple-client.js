const http = require('node:http');
const { title } = require('node:process');

//agent is used to manage TCP connections
//如果有多个连接需要打开或者关闭，需要使用Agent来做到这些事
//对应着底层的TCP连接
const agent = new http.Agent({
    keepAlive: true, // Keep the connection alive for reuse
});

// 创建了一个request类的对象，可以使用它来send a request，也是一个Duplex Stream对象
// 如果Read from 这个对象，我们将读取服务器发送给我们的response给我们
// 如果Write to 这个对象，我们将发送这个请求作为一个BODY给服务器
const request = http.request({
    agent: agent, // 使用上面创建的agent，不指定时会自动创建并使用
    hostname: 'localhost', // 服务器的主机名
    port: 8050, // 服务器的端口号
    method: 'POST', // 请求方法
    path:"/create-post", // 请求的路径
    headers: { // 请求头
        'Content-Type': 'application/json', // 请求体的类型,发送JSON数据给服务器
        'name': 'John Doe', // 自定义请求头
        //'Content-Length': Buffer.byteLength(JSON.stringify({ title: 'Hello World', content: 'This is a test post.' })) 
          // It's always content length versus transfer-encoding chunked.
          // 提前指定了请求体的长度则会使用content length，不提前知道请求大小指定content length，则会采用transfer-encoding chunked.
    }
}) 

//只会触发一次的事件,这个函数只有一个参数，代表实际的response，可以利用data事件来通过Stream获取数据
request.on('response', (response) => {
    
    console.log('---------STATUS----------');
    
    console.log(response.statusCode); // 响应状态码
    
    console.log('---------HEADERS----------');
    
    console.log(response.headers); // 响应头
    
    console.log('---------BODY----------');
    
    response.on('data', (chunk) => {
        console.log(chunk.toString('utf-8')); 
    });

    response.on('end', () => {
        console.log('Response ended.');
    });
})

request.end(
    JSON.stringify({
        title: 'Hello, Server!',
        body: 'this is going to be my last message'
    })
); // 结束请求，表示不再发送数据