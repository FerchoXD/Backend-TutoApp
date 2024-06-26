import { DatabaseConfig } from "../Database/Config/IDatabaseConfig";
import { MySQLConfig } from "../Database/Config/MySQL/MySQLConfig";
import { TutorMySQLRepository } from "./Repositories/TutorMySQLRepository";
import { CreateTutorUseCase } from "../Application/UseCases/CreateTutorUseCase";
import { CreateTutorController } from "./Controllers/CreateTutorController";
import { GetTutorCodeUseCase } from "../Application/UseCases/GetTutorCodeUseCase";
import { GetTutorCodeController } from "./Controllers/GetTutorCodeController";

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

const tutorRepository = new TutorMySQLRepository();

const createTutorUseCase = new CreateTutorUseCase(tutorRepository);
const getTutorCodeUseCase = new GetTutorCodeUseCase(tutorRepository);

export const createTutorController = new CreateTutorController(createTutorUseCase);
export const getTutorCodeController = new GetTutorCodeController(getTutorCodeUseCase);