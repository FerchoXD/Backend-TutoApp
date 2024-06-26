import { StudentModel } from '../Database/Models/MySQL/StudentModel';

export const createStudentFromEvent = async (data: any): Promise<void> => {
    try {
        const { uuid, name, lastname, email, password, role } = data;

        const existingStudent = await StudentModel.findOne({ where: { uuid } });

        if (existingStudent) {
            console.log(`El estudiante con UUID ${uuid} ya existe en la base de datos.`);
            return;
        }

        const newStudent = await StudentModel.create({
            uuid,
            name,
            lastname,
            email,
            password,
            role,
        });

        console.log(`Se creó exitosamente el estudiante ${name} ${lastname}.`);

        console.log('Datos del estudiante almacenados:', newStudent.toJSON());

    } catch (error) {
        console.error('Error al crear estudiante desde el evento:', error);
        throw error; 
    }
};
