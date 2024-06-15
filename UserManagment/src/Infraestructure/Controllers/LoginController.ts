import { Request, Response } from "express";
import { LoginUseCase } from "../../Application/UseCase/LoginUseCase";

export class LoginController {
    constructor(readonly loginUseCase:LoginUseCase){}

    async run(req:Request, res:Response) {
        const response = await this.loginUseCase.run(req.body.email, req.body.password);
        return res.status(response.status).json(response);
    }
}