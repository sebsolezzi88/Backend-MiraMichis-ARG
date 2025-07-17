import { Router } from "express";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { activateAccount, registerUser } from "../controllers/userController";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.get('/activate',activateAccount);

export default router;
