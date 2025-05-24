const net = require('net');
const readline = require('readline/promises');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});


const clearLine = (dir) => {
    //将函数转换为Promise对象，使其可以通过asnyc await语法使用
    return new Promise((resolve, reject) =>{
        //process.stdout是一个writeStream
        process.stdout.clearLine(dir, () => {
            resolve();
        })
    })
}

const moveCursor = (dx,dy)=>{
    return new Promise((resolve,reject) => {
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

let id;

const socket =  net.createConnection(
    {host:"127.0.0.1",port:3008},
    async ()=>{
        console.log('Connected to server');
        
        // ask函数，使enter message始终在控制台消息的底部，每次数据更新都要调用
        const ask = async()=>{
            // 1. 利用readline模块获取命令行输入
            const message = await rl.question("Enter a messsage:");
            
            //移动指针，并清除已有的message行
            await moveCursor(0,-1)//向上移动指针一行，抵消自动换行
            await clearLine(0);//清除当前cursor所在的行

            // 2. 写入显示信息数据，write到socket中，socket是一个duplex流
            socket.write(`${id}-message-${message}`);
        }

        ask();

        socket.on("data",async (data)=>{
            // log an empty line
            console.log();
            // move the cursor one line up
            await moveCursor(0, -1);
            // clear that line that cursor just moved into
            await clearLine(0);
            if(data.toString("utf-8").substring(0, 2) === "id") {
                // 如果是id消息，直接输出
                id = data.toString("utf-8").substring(3);
                console.log(`Your id is ${id}\n`);

            }else{
                // data是一个Buffer对象，所以要转换成字符串
                console.log(data.toString("utf-8"));
            }
            ask();
        })
}); //是一个net.socket对象

// net.createConnection(options[, connectListener])
// net.createConnection(path[, connectListener]) for IPC connections.
// net.createConnection(port[, host][, connectListener]) for TCP connections.



socket.on("end",()=>{
    console.log("ended!");
})


