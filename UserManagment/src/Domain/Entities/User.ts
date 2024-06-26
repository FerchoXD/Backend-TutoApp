import { v4 as uuidv4 } from 'uuid';

export type UserRole = 'tutor' | 'estudiante';

export class User {
    public uuid:string;
    public name:string;
    public lastname:string;
    public email:string;
    public password:string;
    public role: UserRole;

    constructor(name:string, lastname:string, email:string, password:string, role: UserRole) {

        this.uuid = this.generateUuid();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        
        if (role !== 'tutor' && role !== 'estudiante') {
            throw new Error('El rol debe ser "tutor" o "estudiante"');
        }

        this.role = role;
    }

    private generateUuid():string {
        return uuidv4();
    }
}