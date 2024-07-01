import * as amqp from 'amqplib';
import { TutorModel } from '../Database/MySQL/Models/TutorMySQLModel';

const RABBITMQ_URL = 'amqp://localhost';
const QUEUE_NAME = 'user_registered';

export async function consumeFromQueue() {
    try {
        const connection = await amqp.connect(RABBITMQ_URL);
        console.log('Conectado a RabbitMQ');
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log(`Cola ${QUEUE_NAME} declarada correctamente`);

        console.log('Esperando mensajes desde RabbitMQ...');
        channel.consume(QUEUE_NAME, async (message) => {
            if (message !== null) {
                try {
                    const user = JSON.parse(message.content.toString());
                    console.log('Mensaje recibido:', user);

                    if (user.role === 'tutor') {
                        const newTutor = await TutorModel.create({
                            uuid: user.uuid,
                        });

                        //console.log(`Estudiante creado desde el evento de RabbitMQ: ${newStudent.name} ${newStudent.lastname}`);
                        console.log(`Tutor creado desde el evento de RabbitMQ: ${newTutor.uuid}`);
                    } else {
                        console.log('El mensaje no es para un tutor, ignorándolo.');
                    }

                    channel.ack(message);
                } catch (error) {
                    console.error('Error al procesar mensaje de RabbitMQ:', error);
                    channel.nack(message, false, false); 
                }
            }
        });
    } catch (error) {
        console.error('Error en la consumición de la cola RabbitMQ:', error);
    }
}

consumeFromQueue();
