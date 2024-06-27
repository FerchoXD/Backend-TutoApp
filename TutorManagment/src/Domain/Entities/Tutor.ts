import { v4 as uuidv4 } from "uuid";

export class Order {
    uuid:string;
    id_usuario:string;
    horario:string;
    codigo:string;

    constructor(horario:string, codigo:string, id_usuario:string) {
        this.uuid = this.generateUuid();
        this.horario = horario;
        this.id_usuario = id_usuario;
        this.codigo = codigo;
    }

    generateUuid():string {
        return uuidv4();
    }
}