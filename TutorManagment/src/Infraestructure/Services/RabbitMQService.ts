import { IRabbitMQService } from "../../Application/Services/IRabbitMQService";
import * as amqplib from 'amqplib';

export class RabbitMQService implements IRabbitMQService {
    private static instance: RabbitMQService;
    readonly connection: amqplib.Connection;

    private constructor(connection: amqplib.Connection) {
        this.connection = connection;
    }

    static async getInstance(): Promise<RabbitMQService> {
        if (!RabbitMQService.instance) {
            const connection = await amqplib.connect('amqp://guest:guest@localhost:5672');
            RabbitMQService.instance = new RabbitMQService(connection);
        }
        return RabbitMQService.instance;
    }

    async sendMessage(queue: string, message: object): Promise<void> {
        const channel = await this.connection.createChannel();
        try {
            await channel.assertQueue(queue, { durable: true });
            await channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });
            console.log(`Mensaje enviado a la cola ${queue}: ${JSON.stringify(message)}`);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        } finally {
            await channel.close();
        }
    }

    async receiveMessage(queue: string, timeout: number = 5000): Promise<any> {
        const channel = await this.connection.createChannel();
        await channel.assertQueue(queue, { durable: true });
        channel.prefetch(1);

        return new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                reject(new Error("Timeout: No message received from queue"));
                channel.close().catch(err => console.error('Error al cerrar el canal', err));
            }, timeout);

            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        console.log(`Mensaje recibido de la cola ${queue}: ${JSON.stringify(message)}`);
                        channel.ack(msg);
                        clearTimeout(timer);
                        resolve(message);
                    } catch (error) {
                        clearTimeout(timer);
                        channel.nack(msg);
                        reject(error);
                    } finally {
                        channel.close().catch(err => console.error('Error al cerrar el canal', err));
                    }
                }
            }, { noAck: false });
        });
    }

    async closeConnection(): Promise<void> {
        try {
            await this.connection.close();
            console.log('Conexión cerrada.');
        } catch (error) {
            console.error('Error al cerrar la conexión:', error);
        }
    }
}
