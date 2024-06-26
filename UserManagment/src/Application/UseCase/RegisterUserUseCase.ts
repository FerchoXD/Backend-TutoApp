import { IUser } from "../../Domain/Ports/IUser";

export class RegisterUserUseCase {
    constructor(readonly userRepository:IUser){}

    async run(name:string,lastname:string,email:string, password:string, role: 'tutor' | 'estudiante') {
        return await this.userRepository.register(name,lastname,email, password, role);        
    }
}