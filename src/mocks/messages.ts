import { Message, TextContent } from '@/models/Message';
import { users } from './users';


export const messages: Message[] = [
    new Message(users[0], users[1], new TextContent('你好，我是1，下面是我的图片'), new Date()),
    new Message(users[0], users[1], new TextContent('很高兴认识你'), new Date()),
    new Message(users[1], users[0], new TextContent('你好，我是2，很高兴认识你'), new Date()),
    
    new Message(users[2], users[0], new TextContent('你好，我是3，下面是我的视频'), new Date()),
]