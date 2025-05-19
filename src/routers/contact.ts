import { Router } from 'express';


const router = Router();


import { Contact } from '@/models/Contact'
import { contacts } from '@/mocks/contacts'


// 获取用户的联系人列表
router.get('/api/contacts/:id', (req, res) => {
    const userId = req.params.id // 从请求参数中获取用户ID并转换为整数)
    const result: Contact[] = []
    if(userId in contacts){
        result.push(...contacts[userId]) // 将该用户的联系人列表添加到结果数组中
    }
    console.log(`User ${userId} has contacts:`, result); // 打印日志
    res.send(result) // 发送联系人ID列表
})




import { getSocket } from '@/stores/socket';


// 添加好友
router.post('/api/contact', (req, res) => {
    const { fromUserId, toUserId } = req.body; // 从请求参数中获取用户ID并转换为整数

    let ok = true;

    const fromUserContacts = contacts[fromUserId]; // 获取fromUserId的联系人列表
    const toUserContacts = contacts[toUserId]; // 获取toUserId的联系人列表
    if(fromUserContacts && toUserContacts){
        fromUserContacts.push(new Contact(toUserId)); // 将toUserId添加到fromUserId的联系人列表中    
        toUserContacts.push(new Contact(fromUserId)); // 将fromUserId添加到toUserId的联系人列表中

        const fromSocket = getSocket(fromUserId); // 获取fromUserId的socket
        const toSocket = getSocket(toUserId); // 获取toUserId的socket
        if(fromSocket){
            console.log('emit contactUpdated to', fromUserId)
            fromSocket.emit('contactUpdated'); // 向fromUserId发送联系人更新事件
        }
        if(toSocket){
            console.log('emit contactUpdated to', toUserId);
            toSocket.emit('contactUpdated'); // 向toUserId发送联系人更新事件
        }
    } else {
        console.log('contact adding failed: user not found')
        ok = false;
    }

    if (ok) {
        console.log('contact added:', fromUserId, 'and', toUserId);
        res.status(201).json({ message: ' successfully' }); // 返回成功信息
    } else {
        console.log('contact adding failed:', fromUserId, 'and', toUserId);
        res.status(400).json({ message: 'adding failed' }); // 返回失败信息
    }
});




// 删除好友
router.delete('/api/contact', (req, res) => {
    const { fromUserId, toUserId } = req.body; // 从请求参数中获取用户ID并转换为整数

    let ok = true;

    const fromUserContacts = contacts[fromUserId]; // 获取fromUserId的联系人列表
    const toUserContacts = contacts[toUserId]; // 获取toUserId的联系人列表
    if(fromUserContacts && toUserContacts){
        fromUserContacts.splice(fromUserContacts.findIndex(contact => contact.id === toUserId), 1); // 将toUserId从fromUserId的联系人列表中移除
        toUserContacts.splice(toUserContacts.findIndex(contact => contact.id === fromUserId), 1); // 将fromUserId从toUserId的联系人列表中移除

        const fromSocket = getSocket(fromUserId); // 获取fromUserId的socket
        const toSocket = getSocket(toUserId); // 获取toUserId的socket
        if(fromSocket){
            console.log('emit contactUpdated to', fromUserId)
            fromSocket.emit('contactUpdated'); // 向fromUserId发送联系人更新事件
        }
        if(toSocket){
            console.log('emit contactUpdated to', toUserId);
            toSocket.emit('contactUpdated'); // 向toUserId发送联系人更新事件
        }
    } else {
        console.log('contact adding failed: user not found')
        ok = false;
    }

    if (ok) {
        console.log('contact removed:', fromUserId, 'and', toUserId);
        res.status(201).json({ message: ' successfully' }); // 返回成功信息
    } else {
        console.log('contact removing failed:', fromUserId, 'and', toUserId);
        res.status(400).json({ message: 'removing failed' }); // 返回失败信息
    }
});







export default router;