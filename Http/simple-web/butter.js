const http = require("node:http")
const fs = require("node:fs/promises");

class Butter {
    
    constructor(){
        this.server = http.createServer();
        this.routes = {}; //存储路由
        /**
         * 对象的样子
         * {
         * "get /":()=>{...},
         * "post /upload":()=>{...}, 
         * }
         * 得到对象的方式
         * this.routes["get /"] ()
         * 
         */
        this.server.on("request",(req,res)=>{
            
            // 定义发送文件给客户端的函数
            res.sendFile = async (path,mime)=>{
                const fileHandle = await fs.open(path, "r");
                const fileStream = fileHandle.createReadStream();
                res.setHeader("Content-Type", mime);

                fileStream.pipe(res);
            }

            // 设置响应的状态
            res.status = (code) => {
                res.statusCode = code; // 设置响应状态码
                return res; // 返回res对象以便链式调用
            }

            // 发送JSON数据(小于Stream Buffer)
            res.json = (data)=>{
                res.setHeader("Content-Type", "application/json"); // 设置响应头为JSON
                res.end(JSON.stringify(data)); // 将数据转换为JSON字符串并发送,这里只针对小的数据，如果遇到大文件，应该使用Stream处理
            }

            // 如果route Key不存在，那么将抛出404 status code
            if (!this.routes[req.method.toLowerCase() + req.url]) {
                return res.status(404).json({
                    error: `Cannot ${req.method} ${req.url}`
                });
            }
            
            // console.log("A request came in")
            this.routes[req.method.toLowerCase() + req.url](req,res); // 调用路由指定的方法
        })
    }
    
    //定义路由方法，将CallBack存入对应routes对象数组中
    route (method, path, callback){
        this.routes[method + path] = callback;
    }

    //定义listen方法，传入port和callbcak函数，这里对listen方法进行了再次封装
    //因为butter类的对象不是HTTP的server对象，所以不能直接调用listen方法
    //所以在butter类中定义一个listen方法，调用其server属性，http的server对象的listen方法
    listen(port, cb){
        this.server.listen(port, ()=>{
            cb();
        })
    }

}

module.exports = Butter;