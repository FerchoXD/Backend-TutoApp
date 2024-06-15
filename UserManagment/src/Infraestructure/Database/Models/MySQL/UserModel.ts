import { DataTypes, Model } from "sequelize";
import { UUIDV4 } from "sequelize";
import sequelize from "../../../../Database/Config/MySQL/Database";

export class UserModel extends Model{
    public uuid!: string;
    public name!: string;
    public lastname!:string;
    public email!:string;
    public password!:string;
}

UserModel.init({
    uuid: { type:DataTypes.UUID, defaultValue: UUIDV4, primaryKey:true, allowNull:false },
    name: { type:DataTypes.STRING, allowNull:true },
    lastname: { type:DataTypes.STRING, allowNull:true },
    email: { type:DataTypes.STRING, allowNull:false, unique:true },
    password: { type:DataTypes.STRING, allowNull:false },
}, { sequelize, modelName:'user' });