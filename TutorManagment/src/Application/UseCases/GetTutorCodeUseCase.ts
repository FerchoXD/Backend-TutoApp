import { ITutor } from "../../Domain/Ports/ITutor";

export class GetTutorCodeUseCase {
    constructor(readonly repository:ITutor){}

    async run (uuid:string) {
        return await this.repository.getTutorCode(uuid);
    }

}