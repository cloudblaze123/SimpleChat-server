const express = require('express');
const app = express();
const port = 3000;

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

// 定义一个路由处理根路径请求，返回页面代码
app.get('/', (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fetch Example</title>
        <script>
            async function fetchMessage() {
                try {
                    const response = await fetch('http://localhost:3000/api/hello');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const message = await response.text();
                    document.getElementById('message').innerText = message;
                } catch (error) {
                    console.error('There has been a problem with your fetch operation:', error);
                }
            }
        </script>
    </head>
    <body>
        <button onclick="fetchMessage()">Get Message</button>
        <div id="message"></div>
    </body>
    </html>`);
});

// 让服务器监听指定端口
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});