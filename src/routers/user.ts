import { Router } from 'express';




const router = Router();


import { users } from '@/mocks/users';
router.get('/api/users', (req, res) => {
    res.send(users);
});


// 登陆
router.post('/api/login', (req, res) => {
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
router.get('/api/user/:id', (req, res) => {
    const userId = req.params.id; // 从请求参数中获取用户ID并转换为整数
    const user = users.find(u => u.id === userId); // 查找用户

    if (user) {
        res.send(user); // 如果找到用户，返回用户信息
    } else {
        res.status(404).json({ message: 'User not found' }); // 如果没有找到用户，返回404错误
    }
});


router.get('/api/usera/router', (req, res) => {

    res.send('user router');

});


export default router;