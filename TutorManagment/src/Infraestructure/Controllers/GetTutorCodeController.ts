import { Request, Response } from "express";
import { GetTutorCodeUseCase } from "../../Application/UseCases/GetTutorCodeUseCase";

export class GetTutorCodeController {
    constructor(readonly useCase:GetTutorCodeUseCase){}

    async run(req:Request, res:Response){
        const response = await this.useCase.run(req.params.UUID);
        return res.status(response.status).json(response)
    }
}