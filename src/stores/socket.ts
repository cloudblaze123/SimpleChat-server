import { Socket } from'socket.io';


// 全局 sockets 容器
// 存储所有连接的客户端
const socketStore:Record<string, Socket> = {};


export { socketStore };