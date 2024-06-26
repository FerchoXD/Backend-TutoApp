import { User, UserRole} from "../../../Domain/Entities/User";
import { IUser } from "../../../Domain/Ports/IUser";
import { UserModel } from "../../Database/Models/MySQL/UserModel";
import bcrypt from "bcrypt";
import { JWTService } from "../../../Application/JWT/JWTService";
import { publishToQueue } from "../../services/rabbitMQService";

export class UserMySQLRepository implements IUser {    

    async login(email: string, password: string): Promise<any> {

        return UserModel.findOne({ where: { email: email } })
            .then(user => {
                if (!user) {
                    return {
                        status: 404,
                        message: 'User not found'
                    };
                }
    
                const passwordIsValid = bcrypt.compareSync(password, user.password);
    
                if (!passwordIsValid) {
                    return {
                        status: 401,
                        message: 'Incorrect password'
                    };
                }
    
                const token = JWTService.generateToken(user.uuid, user.email);
    
                return {
                    status: 200,
                    message: 'Successful login',
                    //token: token,
                    role: user.role
                };
            })
            .catch(error => {
                console.error("Failed to login:", error);
                return {
                    status: 500,
                    message: "Failed to login",
                    error: error
                };
            });
    }

    async register(name: string, lastname: string, email: string, password: string, role: UserRole): Promise<any> {

        if (role !== 'tutor' && role !== 'estudiante') {
            return {
                status: 400,
                message: 'El rol debe ser "tutor" o "estudiante"'
            };
        }

        try {.
            const user = new User(name, lastname, email, password,role);
            user.password = await bcrypt.hash(password, 10);
    
            const userResponse = await UserModel.create({
                uuid: user.uuid,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                password: user.password,
                role: user.role
            });
    
            await publishToQueue({
                uuid: userResponse.uuid,
                name: userResponse.name,
                lastname: userResponse.lastname,
                email: userResponse.email,
                password: userResponse.password,
                role: 'estudiante' 
            });
    
            console.log(`Evento publicado en RabbitMQ para el usuario con UUID ${userResponse.uuid}`);
    
            return {
                status: 201,
                uuid: userResponse.uuid,
                type: 'users',
                attributes: {
                    name: userResponse.name,
                    lastname: userResponse.lastname,
                    email: userResponse.email,
                    password: userResponse.password,
                    role:userResponse.role
                }
            };
    
        } catch (error) {
            console.error("Error registering user:", error);
      }
    } 
}