const Butter = require("./butter")

const PORT = 4060;

const server = new Butter(); //创建服务器

server.route("get","/",(req,res)=>{
    res.status(200).sendFile("./public/index.html","text/html");
})

server.route("get","/styles.css",(req,res)=>{
    res.status(200).sendFile("./public/styles.css","text/css");
});

server.route("get","/scripts.js",(req,res)=>{
    res.status(200).sendFile("./public/scripts.js","text/javascript");
});

server.listen(PORT,()=>{
    console.log(`Server has started on port ${PORT}`)
}) 