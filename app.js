const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


// 中间件、静态文件中间件、路由的定义顺序：
// （回答来自GPT-4）
// 解析请求体中间件应放在所有需要访问请求体的路由之前。
// 静态文件中间件通常会放在解析请求体中间件之后，但在其他路由之前。
// 自定义和第三方中间件应该按逻辑顺序放置在请求处理链中的适当位置。
// 错误处理中间件通常应放在所有路由之后，捕获所有未处理的错误。




// 中间件：打印访问用户的信息
app.use((req, res, next) => {
    const { method, url, headers } = req;
    console.log(`Request received: Method=${method}, URL=${url}, User-Agent=${headers['user-agent']}`);
    next(); // 继续处理请求
});


// 使用 Express 内置解析器来解析 JSON
// （未使用解析时，下方const { message } = req.body;得到的message为undefined）
// GPT-4解释：
// 当客户端发送 HTTP 请求到服务器时，请求主体（body）中的数据是以流（stream）的形式发送的，
// 未经解析的流数据无法直接在 req.body 中访问。
// 解析器中间件的作用是读取流数据，并将其转换为可用的 JavaScript 对象。
app.use(express.json());


// 配置静态文件服务
app.use(express.static(path.join(__dirname, 'public')));




// 定义一个路由，返回 "Hello, World!"
app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});


// 定义一个路由，接收客户端发送的消息，并将其打印到控制台
app.post('/api/send', (req, res) => {
    const { message } = req.body;
    console.log(`Received message: ${message}`);
    res.status(200).send('Message received');
});




// 让服务器监听指定端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});