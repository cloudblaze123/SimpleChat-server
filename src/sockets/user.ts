import { Socket } from "socket.io";

import { socketManager } from "@/sockets/socketManager";




function initUserHandler(socket: Socket) {
    // 处理用户切换事件
    // id 可以为空字符串
    socket.on("switchUser", (data:{oldUserId: string, newUserId: string}) => {
        const { oldUserId, newUserId } = data;

        console.log("User", oldUserId, "switched to", newUserId);
        if(oldUserId){
            socketManager.removeSocket(oldUserId, socket);
        }
        if(newUserId){
            socketManager.addSocket(newUserId, socket);
        }
    });
}




export { initUserHandler };