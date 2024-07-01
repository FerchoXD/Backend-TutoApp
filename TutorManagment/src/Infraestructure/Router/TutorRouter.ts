import { Router } from "express";
import { createTutorController} from "../Dependencies";
import { getTutorCodeController } from "../Dependencies";

export const router:Router = Router();

router.post("/", createTutorController.run.bind(createTutorController));
router.get("/:UUID", getTutorCodeController.run.bind(getTutorCodeController));