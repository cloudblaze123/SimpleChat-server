import { Socket } from "socket.io";

import { socketStore } from "@/stores/socket";




function initUserHandler(socket: Socket) {
    // 处理用户切换事件
    socket.on("switchUser", (data:{oldUserId: string, newUserId: string}) => {
        const { oldUserId, newUserId } = data;

        console.log("User "+ oldUserId +" switched to " + newUserId);
        delete socketStore[oldUserId];
        socketStore[newUserId]=socket;
        console.log(Object.keys(socketStore));
    });
}




export { initUserHandler };