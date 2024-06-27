import { ITutor } from "../../Domain/Ports/ITutor";
import { generateUuid } from "../Helpers/Functions";
import { generarCodigo } from "../Helpers/codigo-tutor";
import { TutorModel } from "../Database/MySQL/Models/TutorMySQLModel";
import { RabbitMQService } from '../../Infraestructure/Services/RabbitMQService';

export class TutorMySQLRepository implements ITutor {

    async createTutorRegistration(): Promise<any> {
        const rabbitMQService = await RabbitMQService.getInstance();
        const queueName = 'tutorQueue';

        // Recibir el mensaje desde la cola
        const message = await rabbitMQService.receiveMessage(queueName);
        if (!message) {
            return {
                status: 404,
                message: 'No message received from the queue'
            };
        }

        // Parsear el mensaje recibido (si es necesario)
        const tutorData = JSON.parse(message);

        // Generar UUID y código
        const TutorUuid = generateUuid();
        const codigo = generarCodigo(12);

        // Crear un nuevo registro de tutor en la base de datos
        const newTutor = await TutorModel.create({
            uuid: TutorUuid,
            id_usuario: tutorData.id_usuario,
            horario: tutorData.horario,
            codigo: codigo,
            status: 'CREATED'
        });

        if (!newTutor) {
            return {
                status: 500,
                message: "Error creating tutor"
            };
        }

        return {
            status: 200,
            message: 'Tutor created successfully',
            data: newTutor
        };
    }

    getTutorCode(uuid: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const tutor = await TutorModel.findOne({
                where: {
                    uuid: uuid
                }
            });

            if (!tutor) {
                resolve({
                    status: 404,
                    message: "Tutor not found"
                });
            }

            resolve({
                status: 200,
                code: tutor?.codigo
            });
        });
    }

}