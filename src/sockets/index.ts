import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

import { socketManager } from '@/sockets/socketManager';

import { initUserHandler } from '@/sockets/user';




// 全局的 SocketIOServer 对象
// 首次使用前需调用 initSocket 函数初始化
let io: SocketIOServer;


const initSocket = (server: http.Server) => {
    io = new SocketIOServer(server);

    io.on('connection', (socket) => {
        const { userId } = socket.handshake.auth;
        console.log('connected User ID:', userId);
        socketManager.addSocket(userId, socket);

        // 监听消息事件
        initUserHandler(socket);
        
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
            socketManager.removeSocket(userId, socket);
        });
    });
};




export { initSocket, io }