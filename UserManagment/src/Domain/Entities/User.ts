import { v4 as uuidv4 } from 'uuid';

export class User {
    public uuid:string;
    public name:string;
    public lastname:string;
    public email:string;
    public password:string;

    constructor(name:string, lastname:string, email:string, password:string) {

        this.uuid = this.generateUuid();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    private generateUuid():string {
        return uuidv4();
    }
}