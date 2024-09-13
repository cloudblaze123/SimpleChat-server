import { Server as SocketIOServer } from 'socket.io';
import http from 'http';

import { socketStore } from '@/stores/socket';

import { initUserHandler } from '@/sockets/user';




// 全局的 SocketIOServer 对象
// 首次使用前需调用 initSocket 函数初始化
let io: SocketIOServer;


const initSocket = (server: http.Server) => {
    io = new SocketIOServer(server);

    io.on('connection', (socket) => {
        const { userId } = socket.handshake.auth;
        console.log('connected User ID:', userId);

        socketStore[userId] = socket;
        console.log('socketStore:', Object.keys(socketStore));

        console.log('User connected count:', io.sockets.sockets.size);


        // 监听消息事件
        initUserHandler(socket);
        
        
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });
};




export { initSocket, io }