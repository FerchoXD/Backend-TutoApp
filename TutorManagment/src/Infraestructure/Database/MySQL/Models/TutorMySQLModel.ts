import { DataTypes, Model } from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";

export class TutorModel extends Model {
    uuid!:string;
    id_usuario!:string;
    horario!:string;
    codigo!:string;
}

TutorModel.init({
    uuid: { type: DataTypes.UUID, defaultValue:DataTypes.UUIDV4, primaryKey:true, allowNull:false },
    id_usuario: { type:DataTypes.STRING, defaultValue:null },
    horario: { type:DataTypes.STRING, defaultValue:null },
    codigo: { type:DataTypes.STRING, defaultValue:null},
},{sequelize, modelName:'tutors'});