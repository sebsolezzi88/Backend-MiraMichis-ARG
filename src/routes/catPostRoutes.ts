import { NextFunction, Request, Response, Router } from "express";
import { createCatPost } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import uploadImage from "../middlewares/uploadImage";
import { AuthRequest } from "../types/express";



const router = Router();

router.post('/',verifyToken,
    uploadImage.single('photo'),(req: Request, res: Response, next: NextFunction) => {
    // TypeScript sabe que 'req' es 'Request' aquí.
    // Usamos 'as AuthRequest' para decirle a TypeScript que ahora sabemos que 'req' es un AuthRequest.
    // Esto asume que 'verifyToken' SIEMPRE establece 'userId' y 'userRol'.
    createCatPost(req as AuthRequest, res);
  }
); //Crear post



export default router;
