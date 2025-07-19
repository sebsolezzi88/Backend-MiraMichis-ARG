import { Router } from "express";
import { validateUserRegister } from "../middlewares/validateUserRegister";
import { activateAccount, loginUser, registerUser, updateProfile } from "../controllers/userController";
import { validateUserLogin } from "../middlewares/validateUserLogin";
import { verifyToken } from "../middlewares/authMiddleware";
import uploadImage from "../middlewares/uploadImage";

const router = Router();

router.post('/register',validateUserRegister ,registerUser);
router.get('/activate',activateAccount);
router.post('/login',validateUserLogin ,loginUser);
router.put('/profile',verifyToken,uploadImage.single('photo'),updateProfile);

export default router;
