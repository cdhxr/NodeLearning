const http =require('node:http');
const fs = require('node:fs/promises');

const server = http.createServer((req, res) => {});

server.on('request', async (request, response) => {
    // request.Method与请求的资源有关，是规范定义好的
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

    //相比HTML，只是修改了文件名
    if(request.method === 'GET' && request.url === '/styles.css') {
        response.setHeader('Content-Type', 'text/css');
        const fileHandle = await fs.open('./public/styles.css',"r")
        const fileStream = fileHandle.createReadStream();

        fileStream.pipe(response);
    }

    if(request.method === 'GET' && request.url === '/scripts.js') {
        response.setHeader('Content-Type', 'text/javascript');
        const fileHandle = await fs.open('./public/scripts.js',"r")
        const fileStream = fileHandle.createReadStream();

        fileStream.pipe(response);
    }

    if(request.url === "/login" && request.method === 'POST') {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200; // 设置响应状态码为200 OK

        const body ={
            message: 'Logging for you in ...', 
        }
        //使用end方法，表明请求结束，否则会一直加载
        response.end(JSON.stringify(body));
    }

    if(request.url === "/user" && request.method === 'PUT') {
        response.setHeader('Content-Type', 'application/json');
        response.statusCode = 200; // 设置响应状态码为200 OK

        const body ={
            message: 'Updating your info ...', 
        }
        //使用end方法，表明请求结束，否则会一直加载
        response.end(JSON.stringify(body));
    }

    //upload route
    if(request.url === "/upload" && request.method === 'PUT'){
        response.setHeader('Content-Type', 'application/json');
        //create a empty file
        const fileHandle = await fs.open('./storage/image.jpeg', 'w');

        const fileStream = fileHandle.createStream();
        request.pipe(fileStream);
        //end事件表明在Stream的传输完成
        request,on('end', () => {
            response.end(JSON.stringify({message: 'File uploaded successfully'}));
        });
    }
});

server.listen(9000, ()=>{
    console.log('Server is listening on port 9000');
});
