import * as amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'user_registered';

export async function publishToQueue(data: any) {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(data)), { persistent: true });
        console.log('Message sent to queue:', data);
        setTimeout(() => {
            connection.close();
        }, 500);
    } catch (error) {
        console.error('Error in publishing to queue:', error);
    }
}
