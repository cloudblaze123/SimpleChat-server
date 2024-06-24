export class MessageSender {

    async sendMessage(url, message) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

}