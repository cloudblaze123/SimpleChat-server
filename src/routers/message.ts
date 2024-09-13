import { Router } from 'express';




const router = Router();



// 消息api
import { stringToDate, toUTCDateString } from '@/utils/date';
import { Message } from '@/models/Message';


import { messageStore } from '@/stores/message';

// 接收文本消息
router.post('/api/message', (req, res) => {
    const { senderId, receiverId, content } = req.body; // 从请求参数中获取信息
    const message = new Message(senderId, receiverId, content, new Date()); // 构建消息对象

    messageStore.addMessage(message);
    console.log(`Message received: ${message.content.text}`); // 打印日志
    console.log(`timestamp: ${message.timestamp}`); // 打印日志

    res.send('Message received'); // 发送响应
});


// 接收图片和视频消息
router.post('/api/media-message', (req, res) => {
    const { senderId, receiverId, content } = req.body; // 从请求参数中获取信息
    const message = new Message(senderId, receiverId, content, new Date()); // 构建消息对象
    
    messageStore.addMessage(message);
    console.log(`Message received: ${message.content.type}`); // 打印日志
    
    res.send('Message received'); // 发送响应
});


// 获取消息列表
router.get('/api/messages', (req, res) => {
    const messages = messageStore.getMessages(); // 获取消息列表
    res.send({
        messages: messages,
        timestamp: toUTCDateString(new Date()) // 发送当前时间戳
    }); // 发送消息列表
});


// 获取指定日期后的消息（不包含指定日期的消息）
// 日期使用 UTC 时区
router.get('/api/messages/:date', (req, res) => {
    // 年-月-日-时-分-秒-毫秒
    const dateString = (req.params.date as string); // 从请求参数中获取日期
    
    const filteredMessages = messageStore.getMessagesAfter(stringToDate(dateString)); // 获取消息列表

    res.send({
        messages: filteredMessages,
        timestamp: toUTCDateString(new Date()) // 发送当前时间戳
    }); // 发送消息列表
});




export default router;