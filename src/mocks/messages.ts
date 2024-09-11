import { stringToDate } from '@/utils/date';
import { Message, TextContent } from '@/models/Message';
import { users } from './users';


export const messages: Message[] = [
    new Message(users[0].id, users[1].id, new TextContent('你好，我是1，下面是我的图片'), stringToDate("2024-1-2-0-0-0-0")),
    new Message(users[0].id, users[1].id, new TextContent('很高兴认识你'), stringToDate("2024-1-2-0-0-0-200")),
    new Message(users[1].id, users[0].id, new TextContent('你好，我是2，很高兴认识你'), stringToDate("2024-1-2-0-0-0-400")),
    new Message(users[2].id, users[0].id, new TextContent('你好，我是3，下面是我的视频'), stringToDate("2024-1-2-0-0-0-300")),
]