import { v4 as uuidv4 } from 'uuid';

export class Student {
    public uuid:string;

    constructor(name:string, lastname:string, email:string, password:string, role:string) {

        this.uuid = this.generateUuid();
    }

    private generateUuid():string {
        return uuidv4();
    }
}