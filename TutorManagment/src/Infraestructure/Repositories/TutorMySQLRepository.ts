import { ITutor } from "../../Domain/Ports/ITutor";
import { generateUuid } from "../Helpers/Functions";
import { generarCodigo } from "../Helpers/codigo-tutor";
import { TutorModel } from "../Database/MySQL/Models/TutorMySQLModel";

export class TutorMySQLRepository implements ITutor {

    async createTutorRegistration(tutorData: any): Promise<any> {
        const TutorUuid = generateUuid();
        const codigo = generarCodigo(12);

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
            message: "Tutor created successfully",
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