import { Router } from "express";
import { createCatPost } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import uploadImage from "../middlewares/uploadImage";



const router = Router();

router.post('/',verifyToken,uploadImage.single('photo'),createCatPost); //Crear post



export default router;
