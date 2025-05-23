import { Socket } from "socket.io";

import { socketManager } from "@/sockets/socketManager";




function initVideoCallHandler(socket: Socket) {
    socket.on("videoCallRequested", (data:{ senderId: string, receiverId: string }) => {
        const { senderId, receiverId } = data;

        console.log("User", senderId, "requested video call to", receiverId);
        socketManager.broadcast(receiverId, "videoCallRequested", data);
    });

    socket.on("videoCallRejected", (data:{ senderId: string, receiverId: string }) => {
        const { senderId, receiverId } = data;

        console.log("User", receiverId, "rejected video call from", senderId);
        socketManager.broadcast(senderId, "videoCallRejected", data);
    })
}




export { initVideoCallHandler };