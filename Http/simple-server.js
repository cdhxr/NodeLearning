const http = require('node:http');

const server = http.createServer();

server.on('request', (req, res) => {
    console.log("---------METHOD----------");
    //通常只是表明请求的类型，来起到说明作用，post、get、put、delete等
    //在实际的应用中，通常会根据请求类型来决定如何处理请求
    console.log(req.method);

    
    console.log("---------URL----------"); 
    //请求的路径，通常是一个相对路径
    //类似于路由，为不同页面命名
    console.log(req.url);
    
    
    console.log("---------HEADERS----------");
    //请求头，确定了请求的结构
    //包含了请求的元信息，比如请求的类型、编码、语言等
    
    console.log(req.headers);

    const name = req.headers.name || 'Guest';

    //无法通过request.body获取请求体，如果可以直接访问到，意味着所有内容都在内存中存储了，这可能会带来性能问题
    //NodeJS中，request是一个Readable Stream，需要通过Stream的方式来获取请求体，这使得我们可以发送huge request
    console.log("---------BODY----------")

    let data = "";
    //监听data事件来获取请求体数据

    req.on('data', (chunk) => {
        data += chunk.toString('utf-8');
    });
    
    req.on('end', () => {
        data = JSON.parse(data);
        console.log(data);
        console.log(name);

        //指定状态码和响应头
        res.writeHead(200, {'Content-Type': 'application/json',});
        res.end(JSON.stringify({
            message: `Post with title ${data.title} has been created by ${name}.`,
            data: data
        }));
    });
});


server.listen(8050, () => {
    console.log('Server is listening on http://localhost:8050');
});
