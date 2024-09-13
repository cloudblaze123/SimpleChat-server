import { EventEmitter } from "events";

import { Message } from "@/models/Message";

import { dateToString } from "@/utils/date";



import { messages as mockMessages } from '@/mocks/messages';
const messageDatas = mockMessages;


class MessageStore {
    emits = new EventEmitter();

    messages:Message[] = [];

    constructor() {
        this.messages = messageDatas;
    }

    addMessage(message:Message) {
        console.log('addMessage to messageStore');
        this.messages.push(message);
        this.emits.emit('messageAdded', message);
    }

    getMessages() {
        return this.messages;
    }

    getMessagesAfter(timestamp:Date) {
        const filteredMessages = this.messages.filter(m => m.timestamp > timestamp); // 过滤出指定日期后的消息
        console.log(`Messages after ${dateToString(timestamp)}:`, filteredMessages.map((m)=>m.timestamp)); // 打印日志
        return filteredMessages;
    }

    on(event:string, listener:(...args: any[]) => void) {
        this.emits.on(event, listener);
    }
}


// 全局单例
const messageStore = new MessageStore();

export { messageStore };
