import { Request, Response } from "express";

export const creatBlogPost = async (req: Request, res: Response): Promise<Response> => {
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