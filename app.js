const express = require('express');
const path = require('path');

const app = express();
const port = 3000;


// 配置静态文件服务
app.use(express.static(path.join(__dirname, 'public')));


// 中间件：打印访问用户的信息
app.use((req, res, next) => {
    const { method, url, headers } = req;
    console.log(`Request received: Method=${method}, URL=${url}, User-Agent=${headers['user-agent']}`);
    next(); // 继续处理请求
});


// 定义一个路由，返回 "Hello, World!"
app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});


// 让服务器监听指定端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});