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

// 使用 Express 内置解析器来解析 JSON
app.use(express.json());


app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});


import { users } from '@/mocks/users';
app.get('/api/users', (req, res) => {
    res.send(users);
});

// 登陆
app.post('/api/login', (req, res) => {
    const { email } = req.body; // 从请求参数中获取用户ID并转换为整数
    console.log(`User ${email} is trying to log in`); // 打印日志
    const user = users.find(u => u.email === email); // 查找用户

    if (user) {
        res.send(user.id); // 如果找到用户，返回用户id
        console.log(`User ${email} logged in`); // 打印日志
    } else {
        res.status(404).json({ message: 'User not found' }); // 如果没有找到用户，返回404错误
        console.log(`User ${email} failed to log in`); // 打印日志
    }
});

// 根据用户ID返回用户信息
app.get('/api/user/:id', (req, res) => {
    const userId = req.params.id; // 从请求参数中获取用户ID并转换为整数
    const user = users.find(u => u.id === userId); // 查找用户

    if (user) {
        res.send(user); // 如果找到用户，返回用户信息
    } else {
        res.status(404).json({ message: 'User not found' }); // 如果没有找到用户，返回404错误
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
