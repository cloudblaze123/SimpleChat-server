import { Router } from 'express';




const router = Router();


import { contacts } from '@/mocks/contacts'

router.get('/api/contacts/:id', (req, res) => {
    const userId = req.params.id // 从请求参数中获取用户ID并转换为整数)
    const contactIds = contacts.filter(c => c.userId === userId)[0].contactIds // 获取与该用户有联系的用户ID列表
    console.log(`User ${userId} has contacts: ${contactIds}`); // 打印日志
    res.send(contactIds) // 发送联系人ID列表
})




import { getSocket } from '@/stores/socket';


// 添加好友
router.post('/api/contact', (req, res) => {
    const { fromUserId, toUserId } = req.body; // 从请求参数中获取用户ID并转换为整数

    let ok = true;

    const fromUserContact = contacts.filter(c => c.userId === fromUserId)[0]; // 获取fromUserId的联系人列表
    const toUserContact = contacts.filter(c => c.userId === toUserId)[0]; // 获取toUserId的联系人列表
    if(fromUserContact && toUserContact){
        fromUserContact.addContact(toUserId); // 将toUserId添加到fromUserId的联系人列表中    
        toUserContact.addContact(fromUserId); // 将fromUserId添加到toUserId的联系人列表中

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

    const fromUserContact = contacts.filter(c => c.userId === fromUserId)[0]; // 获取fromUserId的联系人列表
    const toUserContact = contacts.filter(c => c.userId === toUserId)[0]; // 获取toUserId的联系人列表
    if(fromUserContact && toUserContact){
        fromUserContact.removeContact(toUserId); // 将toUserId添加到fromUserId的联系人列表中    
        toUserContact.removeContact(fromUserId); // 将fromUserId添加到toUserId的联系人列表中

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