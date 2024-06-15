import { DatabaseConfig } from "../Database/Config/IDatabaseConfig";
import { LoginUseCase } from "../Application/UseCase/LoginUseCase";
import { RegisterUserUseCase } from "../Application/UseCase/RegisterUserUseCase";
import { LoginController } from "./Controllers/LoginController";
import { RegisterUserController } from "./Controllers/RegisterUserController";
import { UserMySQLRepository } from "./Repositories/MySQL/UserMySQLRepository";
import { MySQLConfig } from "../Database/Config/MySQL/MySQLConfig";

type DatabaseType = 'MySQL' | 'MongoDB';
const dbType: DatabaseType = 'MySQL';

function getDatabaseConfig(): DatabaseConfig {
    if (dbType === 'MySQL') {
      return new MySQLConfig();
    } 
    throw new Error('Unsupported repository type');
}

const dbConfig = getDatabaseConfig();
dbConfig.initialize().then(() => {
  console.log('Database initialized.')
});

const userRepository = new UserMySQLRepository();

const loginUseCase = new LoginUseCase(userRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);

export const loginController = new LoginController(loginUseCase);
export const registerUserController = new RegisterUserController(registerUserUseCase);