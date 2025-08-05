import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { verifyRolAdmin } from "../middlewares/validateRol";
import { creatBlogPost, deleteBlogPost, getBlogPostById, getBlogPostByUserId, getBlogPosts, updateBlogPost } from "../controllers/blogPostController";
import { validateBlogPost } from "../middlewares/validateBlogPost";

const router = Router();

router.post('/',verifyToken,verifyRolAdmin,validateBlogPost,creatBlogPost); //crea un post de blog
router.get('/user/:userId',verifyToken,verifyRolAdmin,getBlogPostByUserId);
router.put('/:blogPostId',verifyToken,verifyRolAdmin,updateBlogPost); //actualizar un blog post
router.delete('/:blogPostId',verifyToken,verifyRolAdmin,deleteBlogPost); //borrar un blog post
router.get('/',getBlogPosts); //obtener todos los blog post 
router.get('/:blogPostId',getBlogPostById); //obtener un blog post por su id



export default router;