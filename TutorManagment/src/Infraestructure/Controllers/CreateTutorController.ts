import { Request, Response } from "express";
import { CreateTutorUseCase } from "../../Application/UseCases/CreateTutorUseCase";

export class CreateTutorController {
    constructor(readonly createTutorsUseCase:CreateTutorUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.createTutorsUseCase.run(req.body);
        return res.status(response.status).json(response);
    }
}