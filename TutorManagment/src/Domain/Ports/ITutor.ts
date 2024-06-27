import { Order } from "../Entities/Tutor";

export interface ITutor {
    createTutorRegistration(tutorData:any):Promise<Order[]|any>
    //TODO: make the getOrders():Promise<Order[]|any>
    getTutorCode(uuid:string):Promise<Order|any>

    //TODO: make the updateStatus(data:any):Promise<any>
    //TODO: make the deleteOrder(uuid:string):Promise<any>
}