import { User } from "../Entities/User";

export interface IUser {
    login(email:string, password:string):Promise<User|any>;
    register(name:string, lastname:string ,email:string, password:string, role:'tutor' | 'estudiante'):Promise<User|any>;
}