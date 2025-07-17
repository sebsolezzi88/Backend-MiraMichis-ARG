import { Router } from "express";
import { createCatPost } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";



const router = Router();

router.post('/',verifyToken,createCatPost); //Crear post



export default router;
