import express from 'express';


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
// 因为目前前端使用base64编码上传文件，所以这里将上传大小限制改大一些，以便测试
app.use(express.json( { limit: '10mb' }));



// 路由
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




// 消息api
import { messages as mockMessages } from '@/mocks/messages';
const messages = mockMessages;
// 接收文本消息
app.post('/api/message', (req, res) => {
    const { sender, receiver, content, timestamp } = req.body; // 从请求参数中获取信息
    const message = { sender, receiver, content, timestamp }; // 构建消息对象
    messages.push(message);
    console.log(`Message received: ${message.content.text}`); // 打印日志
    res.send('Message received'); // 发送响应
});
// 接收图片和视频消息
app.post('/api/media-message', (req, res) => {
    const { sender, receiver, content, timestamp } = req.body; // 从请求参数中获取信息
    const message = { sender, receiver, content, timestamp }; // 构建消息对象
    messages.push(message);
    console.log(`Message received: ${message.content.type}`); // 打印日志
    res.send('Message received'); // 发送响应
});

// 获取消息列表
app.get('/api/messages', (req, res) => {
    res.send(messages); // 发送消息列表
});




import { contacts } from '@/mocks/contacts'

app.get('/api/contacts/:id', (req, res) => {
    const userId = req.params.id // 从请求参数中获取用户ID并转换为整数)
    const contactIds = contacts.filter(c => c.userId === userId)[0].contactIds // 获取与该用户有联系的用户ID列表
    console.log(`User ${userId} has contacts: ${contactIds}`); // 打印日志
    res.send(contactIds) // 发送联系人ID列表
})



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
