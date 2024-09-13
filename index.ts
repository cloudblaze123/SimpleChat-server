import express from 'express';




const app = express();
const port = 3000;


// 配置中间件

// 打印访问用户的信息
import { logUrlAccessInfoMiddleware } from '@/middlewares/logger';
app.use(logUrlAccessInfoMiddleware);

// 来解析 JSON
// 因为目前前端使用base64编码上传文件，所以这里将上传大小限制改大一些，以便测试
app.use(express.json({ limit: '10mb' }));




// 配置路由

// 用来测试的路由
app.get('/api/hello', (req, res) => {
    res.send('Hello, World!');
});

// 配置用户信息路由
import userRouter from '@/routers/user';
app.use('/', userRouter)

// 配置聊天消息路由
import messageRouter from '@/routers/message';
app.use('/', messageRouter)

// 配置用户联系人路由
import contactRouter from '@/routers/contact';
app.use('/', contactRouter)




// 配置 socket 服务
import { createServer } from "http";
const httpServer = createServer(app);

import { initSocket, io } from "@/sockets";
initSocket(httpServer)




// 配置消息更新通知
import { initMessageHandler } from '@/controllers/message';
initMessageHandler()








httpServer.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});




// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
