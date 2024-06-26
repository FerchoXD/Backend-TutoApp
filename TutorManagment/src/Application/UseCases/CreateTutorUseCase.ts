import { ITutor } from "../../Domain/Ports/ITutor";

export class CreateTutorUseCase {
    constructor(readonly repository:ITutor){}

    async run(tutorData:any) {
        return await this.repository.createTutorRegistration(tutorData);
    }
}