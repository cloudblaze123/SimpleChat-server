import { messageStore } from "@/stores/message";
import { socketStore } from "@/stores/socket";




function initMessageHandler() {
    // 监听数据库消息添加事件，触发时通知用户更新数据
    messageStore.on("messageAdded", (message) => {
        const { senderId, receiverId} = message;
        
        // 使用 socket 通知用户更新数据
        // console.log(socketStore)
        if (socketStore[senderId]) {
            console.log(`user ${senderId} online, emit messageAdded`);
            socketStore[senderId].emit("messageAdded");
        }
        if (socketStore[receiverId]) {
            console.log(`user ${receiverId} online, emit messageAdded`);
            socketStore[receiverId].emit("messageAdded");
        }
        
    });
}




export { initMessageHandler };