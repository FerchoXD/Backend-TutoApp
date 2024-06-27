export interface IRabbitMQService {
    sendMessage(queue: string, message: any): Promise<void>;
    receiveMessage(queue: string): Promise<any>;
}