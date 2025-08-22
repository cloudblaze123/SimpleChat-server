import { Server as SocketIOServer } from 'socket.io';
import http from 'http';




// 全局的 SocketIOServer 对象
// 首次使用前需调用 initSocket 函数初始化
let io: SocketIOServer;


const initSocket = (server: http.Server) => {
    io = new SocketIOServer(server);

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    console.log('Socket Server initialized');
};




export { initSocket }