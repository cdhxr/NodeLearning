const http =require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer((req, res) => {});

server.on('request', async (request, response) => {
    //console.log(request.method, request.url);
    if(request.method === 'GET' && request.url === '/') {
        response.setHeader('Content-Type', 'text/html');
        //write可以将数据写入至response body中
        //写入文件数据，那么就需要fs module，而fs module需要配合Stream module使用
        const fileHandle = await fs.open('./public/index.html',"r")
        const fileStream = fileHandle.createReadStream();
        //pipe方法可以将一个可读流的内容传递给一个可写流,
        // 等价于.on(data, (data) => response.write(data))不过要自己处理Backpressure
        //在这里，fileStream是可读流，response是可写流
        fileStream.pipe(response);
    }

});

server.listen(9000, ()=>{
    console.log('Server is listening on port 9000');
});
