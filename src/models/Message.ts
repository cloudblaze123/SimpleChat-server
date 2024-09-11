class Message {
    senderId: string;
    receiverId: string;
    content: Content;
    timestamp: Date;

    constructor(senderId: string, receiverId: string, content: Content, timestamp: Date) {
        this.senderId = senderId;
        this.receiverId = receiverId;
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