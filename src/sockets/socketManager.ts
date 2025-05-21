import { Socket } from 'socket.io';


const logPrefix = 'SocketManager:';


class SocketManager {
    // 用户的 socket 列表
    // （因为用户可能会在不同设备上登录，可能有多个 socket 连接，所以使用列表存储 socket 连接）
    // { userId: Socket[] }
    sockets: Record<string, Socket[]> = {};


    getSocketsOfUser(userId: string): Socket[] {
        if (userId in this.sockets) {
            return this.sockets[userId];
        }
        return [];
    }


    addSocket(userId: string, socket: Socket): void {
        if (userId in this.sockets) {
            if (this.sockets[userId].includes(socket)) {
                console.log(logPrefix, 'Socket already exists in store');
                return;
            }
            this.sockets[userId].push(socket);
        } else {
            this.sockets[userId] = [socket];
        }
        console.log(logPrefix, 'user', userId, 'add socket', socket.id);
        console.log(logPrefix, 'user', userId, 'current sockets number:', this.sockets[userId].length);
    }


    removeSocket(userId: string, socket: Socket): void {
        if (!(userId in this.sockets)) {
            console.log(logPrefix, 'removeSocket: user', userId, 'not found');
            return;
        }
        const index = this.sockets[userId].indexOf(socket);
        if (index < 0) {
            console.log(logPrefix, 'socket', socket.id, 'not found');
            return;
        }

        this.sockets[userId].splice(index, 1);
        console.log(logPrefix, 'user', userId,'remove socket', socket.id);
        console.log(logPrefix, 'user', userId, 'current sockets number:', this.sockets[userId].length);
        if (this.sockets[userId].length === 0) {
            delete this.sockets[userId];
        }
    }


    broadcast(userId: string, event: string, data: any = {}): void {
        const sockets = this.getSocketsOfUser(userId);
        if (sockets.length === 0) {
            return;
        }
        sockets.forEach(socket => {
            socket.emit(event, data);
        });
    }
}


// 全局 sockets 容器
const socketManager = new SocketManager();



export { socketManager };