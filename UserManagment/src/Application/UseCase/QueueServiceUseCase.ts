import { publishToQueue } from "../../Infraestructure/services/rabbitMQService";

export class QueueService {
    async publishUserCreationEvent(uuid: string, role: string): Promise<void> {
        await publishToQueue({
            uuid: uuid,
            role: 'estudiante'
        });
        console.log(`Evento publicado en RabbitMQ para el usuario con UUID ${uuid} y rol ${role}`);
    }

    async publishTutorCreationEvent(uuid: string): Promise<void> {
        await publishToQueue({
            uuid: uuid,
            role: 'tutor'
        });
        console.log(`Evento publicado en RabbitMQ para el tutor con UUID ${uuid}`);
    }
}

