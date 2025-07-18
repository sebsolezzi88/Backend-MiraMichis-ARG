import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { validationResult } from "express-validator";

export const creatBlogPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }

        const{
            title,text,link,typeOfBlogPost
        } = req.body;

        const newBlogPost = await BlogPost.create({
            title:title,
            text:text,
            link:link,
            typeOfBlogPost:typeOfBlogPost,
            userId:req.userId
        })

        return res.status(200).json({ 
            status:"success", 
            message: "Blog post Created",
            blogPost: newBlogPost 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const deleteBlogPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const updateBlogPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPostById = async (req: Request, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
        
  

        return res.status(200).json({ 
            status:"success", 
            message: "ok", 
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}