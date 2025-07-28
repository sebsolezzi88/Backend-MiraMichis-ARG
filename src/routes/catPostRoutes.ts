import { NextFunction, Request, Response, Router } from "express";
import { createCatPost, deleteCatPostById, getAllCatPosts, getCatPostById, 
  getCatPostsByTypeOfPublication, getCatPostsByUser, 
  updateCatPostById, updateCatPostStatus } from "../controllers/catPostController";
import { verifyToken } from "../middlewares/authMiddleware";
import uploadImage from "../middlewares/uploadImage";
import { AuthRequest } from "../types/express";



const router = Router();

router.get('/',getAllCatPosts); //Obtener todos los post
router.get('/type/:type',getCatPostsByTypeOfPublication); //Obtener todos los post por tipo de publicación
router.get('/:id', getCatPostById);   // Obtener un catpost por ID
router.get('/user/:userId', getCatPostsByUser);  //Obtener todos los post de un usuario
router.delete('/:id',verifyToken ,deleteCatPostById);      // Eliminar un catpost por ID
router.patch('/:id/status',verifyToken ,updateCatPostStatus);//Actualizar estado activo/resuelto
/* router.post('/',verifyToken,
    uploadImage.single('photo'),(req: Request, res: Response, next: NextFunction) => {
    // TypeScript sabe que 'req' es 'Request' aquí.
    // Usamos 'as AuthRequest' para decirle a TypeScript que ahora sabemos que 'req' es un AuthRequest.
    // Esto asume que 'verifyToken' SIEMPRE establece 'userId' y 'userRol'.
    createCatPost(req as AuthRequest, res);
  }
) */; //Crear post
router.put('/:id',verifyToken,uploadImage.single('photo'),updateCatPostById); //Actulizar post
router.post('/',verifyToken,uploadImage.single('photo'),createCatPost);


export default router;
