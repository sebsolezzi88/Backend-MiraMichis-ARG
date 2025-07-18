import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { verifyRolAdmin } from "../middlewares/validateRol";
import { creatBlogPost, deleteBlogPost, getBlogPostById, updateBlogPost } from "../controllers/blogPostController";

const router = Router();

router.post('/',verifyToken,verifyRolAdmin,creatBlogPost); //crea un post de blog
router.put('/:blogPostId',verifyToken,verifyRolAdmin,updateBlogPost); //actualizar un blog post
router.delete('/:blogPostId',verifyToken,verifyRolAdmin,deleteBlogPost); //borrar un blog post
router.get('/',getBlogPostById); //obtener todos los blog post 
router.get('/:blogPostId',getBlogPostById); //obtener un blog post por su id



export default router;