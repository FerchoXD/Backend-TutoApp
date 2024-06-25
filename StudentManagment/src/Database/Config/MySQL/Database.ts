import { Sequelize } from 'sequelize';
import "dotenv/config";

const dialect: string = process.env.DB_DIALECT || 'mysql';

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USER as string, process.env.DB_PASSWORD as string, {
    host: process.env.DB_HOST as string,
    dialect: dialect as any,
});
  
export default sequelize;