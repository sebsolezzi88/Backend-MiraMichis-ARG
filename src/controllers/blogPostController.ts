import { Request, Response } from "express";
import BlogPost from "../models/BlogPost";
import { validationResult } from "express-validator";
import { Types } from "mongoose";

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

        return res.status(201).json({ 
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
        
        const id = req.params.blogPostId;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid blog post ID.",
            });
        }

        const blogPost = await BlogPost.findById(id);

        if(!blogPost){
            return res.status(404).json({ 
                status:"error", 
                message: "Blog post not found", 
            });
        }
        await blogPost.deleteOne(); //borramos el blogpost

        return res.status(200).json({ 
            status:"success", 
            message: "Blog post deleted", 
        });

    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const updateBlogPost = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }

        const{
            title,text,link,typeOfBlogPost
        } = req.body;

        const id = req.params.blogPostId;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid blog post ID.",
            });
        }

        const blogPost = await BlogPost.findById(id);

        if(!blogPost){
            return res.status(404).json({ 
                status:"error", 
                message: "Blog post not found", 
            });
        }

        //Actualizar blog post
        blogPost.title = title;
        blogPost.link = link;
        blogPost.text = text;
        blogPost.typeOfBlogPost =typeOfBlogPost;

        await blogPost.save(); //Guardar cambios

        

        return res.status(201).json({ 
            status:"success", 
            message: "Blog post Updated",
            blogPost 
        });
        
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPostById = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const id = req.params.blogPostId;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                status: "error",
                message: "Invalid blog post ID.",
            });
        }

        const blogPost = await BlogPost.findById(id);

        if(!blogPost){
            return res.status(404).json({ 
            status:"error", 
            message: "Blog post not found", 
        });
        }

        return res.status(200).json({ 
            status:"success", 
            message: "Blog post found", 
            blogPost
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}
export const getBlogPosts = async (req: Request, res: Response): Promise<Response> => {
    try {
        
        const blogPosts = await BlogPost.find();
  

        return res.status(200).json({ 
            status:"success", 
            message: "Blog posts found", 
            blogPosts
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}

export const getBlogPostByUserId = async (req: Request, res: Response): Promise<Response> =>{
    try {
        
        
        const blogPosts = await BlogPost.find({userId:req.userId}).sort({createdAt:-1});
  

        return res.status(200).json({ 
            status:"success", 
            message: "Blog posts found", 
            blogPosts
        });
    } catch (error) {
        console.error("Error send Message:", error);
        return res.status(500).json({ status:"error", message: "Server error" });
    }
}