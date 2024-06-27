import { DataTypes, Model } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";

export class StudentModel extends Model {
    public uuid!: string;
}

StudentModel.init({
    uuid: { type: DataTypes.UUID, defaultValue: UUIDV4, primaryKey: true, allowNull: false },
}, { sequelize, modelName: 'students' });
