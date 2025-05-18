import { Socket } from 'socket.io';


// 全局 sockets 容器
// 存储所有连接的客户端
// { userId: Socket }
const socketStore: Record<string, Socket> = {};


function getSocket(userId: string): Socket | undefined {
    return socketStore[userId];
}

export { socketStore, getSocket };