import { Request, Response } from "express";
import { RegisterUserUseCase } from "../../Application/UseCase/RegisterUserUseCase";

export class RegisterUserController {
    constructor(readonly registerUserUseCase:RegisterUserUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.registerUserUseCase.run(req.body.name, req.body.lastname, req.body.email, req.body.password);
        return res.status(response.status).json(response);
    }
}