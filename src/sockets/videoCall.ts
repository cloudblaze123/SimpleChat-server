import { Socket } from "socket.io";

import { socketManager } from "@/sockets/socketManager";




function initVideoCallHandler(socket: Socket) {
    socket.on("videoCallRequested", (receiverId: string) => {
        const senderId = socket.data.userId as string
        console.log("User", senderId, "requested video call to", receiverId);
        socketManager.broadcast(receiverId, "videoCallRequested", senderId);
    });

    socket.on("videoCallRejected", (receiverId: string) => {
        const senderId = socket.data.userId as string
        console.log("User", receiverId, "rejected video call from", senderId);
        socketManager.broadcast(receiverId, "videoCallRejected", senderId);
    });

    socket.on("videoCallAccepted", (receiverId: string) => {
        const senderId = socket.data.userId as string
        console.log("User", receiverId, "accepted video call from", senderId);
        socketManager.broadcast(receiverId, "videoCallAccepted", senderId);
    });


    // rtc
    // 处理加入房间的请求
    socket.on('join', (room) => {
        socket.join(room);
        console.log(`用户 ${socket.id} 加入了房间 ${room}`);
    });

    // 处理信令消息
    socket.on('signal', (data) => {
        // 将消息转发给房间内的其他用户
        socket.to(data.room).emit('signal', data);
    });
}




export { initVideoCallHandler };