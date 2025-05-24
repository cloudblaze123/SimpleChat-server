import { Socket } from "socket.io";

import { socketManager } from "@/sockets/socketManager";




function initVideoCallHandler(socket: Socket) {
    socket.on("videoCallRequested", (data: { senderId: string, receiverId: string }) => {
        const { senderId, receiverId } = data;

        console.log("User", senderId, "requested video call to", receiverId);
        socketManager.broadcast(receiverId, "videoCallRequested", data);
    });

    socket.on("videoCallRejected", (data: { senderId: string, receiverId: string }) => {
        const { senderId, receiverId } = data;

        console.log("User", receiverId, "rejected video call from", senderId);
        socketManager.broadcast(senderId, "videoCallRejected", data);
    });

    socket.on("videoCallAccepted", (data: { senderId: string, receiverId: string }) => {
        const { senderId, receiverId } = data;

        console.log("User", receiverId, "accepted video call from", senderId);
        socketManager.broadcast(senderId, "videoCallAccepted", data);
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