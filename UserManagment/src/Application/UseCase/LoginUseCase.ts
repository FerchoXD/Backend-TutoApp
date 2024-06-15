import { IUser } from "../../Domain/Ports/IUser";

export class LoginUseCase {
    constructor(readonly userRepository:IUser){}

    async run(email:string, password:string) {
        return await this.userRepository.login(email, password);
    }
}