import { TutorModel } from "../Database/MySQL/Models/TutorMySQLModel";


export const publishTutorCreationEvent = async (data: any): Promise<void> => {
    try {
        const { uuid} = data;

        const existingTutor = await TutorModel.findOne({ where: { uuid } });

        if (existingTutor) {
            console.log(`El tutor con UUID ${uuid} ya existe en la base de datos.`);
            return;
        }

        const newTutor = await TutorModel.create({
            uuid,
        });

        console.log(`Se creó exitosamente el tutor ${uuid}.`);

        console.log('Datos del estudiante almacenados:', newTutor.toJSON());

    } catch (error) {
        console.error('Error al crear tutor desde el evento:', error);
        throw error; 
    }
};
