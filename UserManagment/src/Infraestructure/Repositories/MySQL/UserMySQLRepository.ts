import { User, UserRole} from "../../../Domain/Entities/User";
import { IUser } from "../../../Domain/Ports/IUser";
import { UserModel } from "../../Database/Models/MySQL/UserModel";
import bcrypt from "bcrypt";
import { JWTService } from "../../../Application/JWT/JWTService";

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
    
        const user = new User(name, lastname, email, password, role);
    
        return bcrypt.hash(password, 10)
            .then(hashedPassword => {
                user.password = hashedPassword;
    
                return UserModel.create({
                    uuid: user.uuid,
                    name: user.name,
                    lastname: user.lastname,
                    email: user.email,
                    password: user.password,
                    role: user.role
                });
            })
            .then(userResponse => {
                return {
                    status: 201,
                    uuid: userResponse.dataValues.uuid,
                    type: 'users',
                    attributes: {
                        name: userResponse.dataValues.name,
                        lastname: userResponse.dataValues.lastname,
                        email: userResponse.dataValues.email,
                        password: userResponse.dataValues.password,
                        role: userResponse.dataValues.role
                    }
                };
            })
            .catch(error => {
                console.error('Error registering user:', error);
                return {
                    status: 500,
                    message: 'Error registering user',
                    error: error
                };
            });
    }

}