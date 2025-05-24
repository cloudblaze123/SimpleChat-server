import { Socket } from "socket.io";

import { socketManager } from "@/sockets/socket-manager";




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


    // 处理信令消息
    socket.on('signal', (receiverId, data) => {
        const senderId = socket.data.userId as string;
        console.log(senderId, '发给', receiverId, '信令消息', data.type);
        socketManager.broadcast(receiverId, "signal", senderId, data);
    });
}




export { initVideoCallHandler };