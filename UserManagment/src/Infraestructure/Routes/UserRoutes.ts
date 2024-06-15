import { Router } from "express";
import {loginController, registerUserController} from "../Dependencies";

const UserRoutes = Router();

UserRoutes.post('/login', loginController.run.bind(loginController));

UserRoutes.post('/register', registerUserController.run.bind(registerUserController));


export default UserRoutes;