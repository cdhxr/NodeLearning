# Net Module

允许创建TCP或者ICP的Server和Client

TCP指传输控制协议，处理跨终端的通信
ICP指的是inter-process Communication，进程间通信，只在操作系统内部完成，即内部的通信

Example：客户端进程操作，通过NodeJS进程，从数据库获取信息


- net.createServer() 在服务端创建服务器
- net.createConnection() 在客户端创建连接

然后，就可以实现通信

通过 net.createConnection() 方法创建的实例为Net.Server这个Class内的，这个类，定义了Net.Server对象的属性和行为等等

这也是一个EventEmitter有一系列对应的事件可以监听

- 事件：close，connection，error，listening 等等
- 方法：close，getconnection,listen,address


listen()方法：开始服务器对某个连接的监听，根据参数类型会自动判断是ICP还是TCP
address()方法：根据服务器类型，返回监听服务器的地址信息

socket基本上就是一个端点

在网络通信中，endpoint 通常指一个通信的终点，具体由以下两个要素唯一确定：

```ruby
IP地址 + 端口号（IP:Port）
```

🔹 Endpoint 可以是：
- 一个客户端（例如浏览器、APP 等）上的某个网络接口

- 一个服务器（如 Web 服务器、API 服务）上的某个监听端口

- 任何网络通信的发起者或接收者，只要有 IP 和端口就能称作 endpoint

当我们有两个相互通信的端点（endpoint）时，我们称之为Sockets

createConnection
- net.createConnection(options[, connectListener])
- net.createConnection(path[, connectListener]) for IPC connections.
- net.createConnection(port[, host][, connectListener]) for TCP connections.