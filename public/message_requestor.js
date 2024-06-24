export class MessageRequestor {

    async requestMessage(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const messages = await response.json();
            return messages;
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }
}