import express from 'express';
import path from 'path';

const app = express();
const port = 3000;


// 中间件：打印访问用户的信息
app.use((req, res, next) => {
    const { method, url, headers } = req;
    // console.log(`Request received: Method=${method}, URL=${url}, User-Agent=${headers['user-agent']}`);
    console.log(`Request received: Method=${method}, URL=${url}`);
    next(); // 继续处理请求
});


app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});


import { users } from '@/mocks/users';
app.get('/api/users', (req, res) => {
    res.send(users);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
