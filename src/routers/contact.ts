import { Router } from 'express';




const router = Router();


import { contacts } from '@/mocks/contacts'

router.get('/api/contacts/:id', (req, res) => {
    const userId = req.params.id // 从请求参数中获取用户ID并转换为整数)
    const contactIds = contacts.filter(c => c.userId === userId)[0].contactIds // 获取与该用户有联系的用户ID列表
    console.log(`User ${userId} has contacts: ${contactIds}`); // 打印日志
    res.send(contactIds) // 发送联系人ID列表
})




export default router;