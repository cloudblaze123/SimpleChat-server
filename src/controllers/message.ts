import { messageStore } from "@/stores/message";
import { socketManager } from "@/sockets/socketManager";




function initMessageHandler() {
    // 监听数据库消息添加事件，触发时通知用户更新数据
    messageStore.on("messageAdded", (message) => {
        const { senderId, receiverId} = message;
        
        socketManager.broadcast(receiverId, "messageAdded");
        socketManager.broadcast(senderId, "messageAdded");        
    });
}




export { initMessageHandler };