import { User } from './User';

class Message {
    sender: User;
    receiver: User;
    content: Content;
    timestamp: Date;

    constructor(sender: User, receiver: User, content: Content, timestamp: Date) {
        this.sender = sender;
        this.receiver = receiver;
        this.content = content
        this.timestamp = timestamp;
    }
}

class Content {
    type: string;
    constructor(type: string) {
        this.type = type;
    }
}

class TextContent extends Content {
    text: string;
    constructor(text: string) {
        super('text');
        this.text = text;
    }
}

class ImageContent extends Content {
    url: string;
    constructor(url: string) {
        super('image');
        this.url = url;
    }
}

class AudioContent extends Content {
    url: string;
    constructor(url: string) {
        super('audio');
        this.url = url;
    }
}

class VideoContent extends Content {
    url: string;
    constructor(url: string) {
        super('video');
        this.url = url;
    }
}

export { Message, Content, TextContent, ImageContent, AudioContent, VideoContent };