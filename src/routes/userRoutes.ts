import { Router } from "express";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { registerUser } from "../controllers/userController";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);

export default router;
