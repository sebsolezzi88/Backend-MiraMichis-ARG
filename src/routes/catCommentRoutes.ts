import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { addComment, deleteComment, getPostComments, updateComment } from "../controllers/catCommentController";



const router = Router();

router.get('/:catPostId/comments', getPostComments); // Obtener todos los comentarios de un post
router.post('/:catPostId/comments', verifyToken, addComment); // Crear comentario
router.delete('/comments/:commentId', verifyToken, deleteComment); // Eliminar un comentario
router.put('/comments/:commentId', verifyToken, updateComment); // Editar un comentario



export default router;
