import { NextFunction, Request, Response, Router } from "express";
import { createCatPost, deleteCatPostById, getAllCatPosts, getCatPostById, updateCatPostStatus } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import uploadImage from "../middlewares/uploadImage";
import { AuthRequest } from "../types/express";



const router = Router();

router.get('/',getAllCatPosts); //Obtener todos los post
router.get('/:id', getCatPostById);   // Obtener un catpost por ID
router.delete('/:id',verifyToken ,deleteCatPostById);      // Eliminar un catpost por ID
router.patch('/:id/status',verifyToken ,updateCatPostStatus);//Actualizar estado activo/resuelto
router.post('/',verifyToken,
    uploadImage.single('photo'),(req: Request, res: Response, next: NextFunction) => {
    // TypeScript sabe que 'req' es 'Request' aquí.
    // Usamos 'as AuthRequest' para decirle a TypeScript que ahora sabemos que 'req' es un AuthRequest.
    // Esto asume que 'verifyToken' SIEMPRE establece 'userId' y 'userRol'.
    createCatPost(req as AuthRequest, res);
  }
); //Crear post



export default router;
