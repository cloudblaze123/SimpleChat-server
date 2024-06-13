const express = require('express');
const app = express();
const port = 3000;

// 定义一个路由处理根路径请求，返回 "Hello, World!"
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// 让服务器监听指定端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});