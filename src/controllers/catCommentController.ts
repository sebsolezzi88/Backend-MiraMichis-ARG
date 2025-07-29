import { Response,Request } from "express";
import { ObjectId, Types } from "mongoose";
import CatPost from "../models/CatPost";
import Comment from "../models/Commet";

interface CustomRequest extends Request {
    userId?: ObjectId;
    
}

export const getPostComments = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {catPostId} = req.params; //id del post a comentario
    
    const existingPost = await CatPost.findById(catPostId).populate('userId', 'username avatarUrl');
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }
    //Encontrar los comentarios del post
    const existingComments = await Comment.find({catPostId}).populate('userId','username avatarUrl');
        
    return res.status(200).json({ status:"success", message: "ok", post: existingPost,comments: existingComments});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}
export const addComment = async (req: Request, res: Response): Promise<Response> => {
  try {
    

    const {catPostId} = req.params; //id del post a comentario
    const userId = req.userId; //id del usuario que comenta
    const {text} = req.body; //Comentario del usuario

    if(!text || text === ''){
      return res.status(400).json({ status:"error", message: "The text is required"});
    }

    const existingPost = CatPost.findById(catPostId);
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }

    const newComment = await Comment.create({catPostId,userId,text});


    // Volvemos a buscar el comentario y lo populamos con los campos del usuario
    const populatedComment = await Comment.findById(newComment._id)
      .populate('userId', 'username avatarUrl'); // solo los campos deseados

    return res.status(200).json({
      status: "success",
      message: "Comment created",
      comment: populatedComment
    });
    
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const updateComment = async (req: Request, res: Response): Promise<Response> => {
 
  try {
    const commentId = req.params.commentId; //id del comentario a borrar
    const userId = req.userId; //id del usuario que comenta
    const {text} = req.body; //Texto a editar

    // Validación básica del ObjectId
    if (!Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ status: "error",message: "Invalid Id" });
    }
    
    const existingComment = await Comment.findById(commentId);
    if(!existingComment){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }

    if( existingComment.userId.toString() !== userId!.toString()){
      return res.status(403).json({ status:"error" ,message: "Unauthorized" });
    }

    existingComment.text = text
    await existingComment.save();
    
    return res.status(200).json({ status:"success", message: "Comment Updated"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}


export const deleteComment = async (req: Request, res: Response): Promise<Response> => {
  try {
    const commentId = req.params.commentId; //id del comentario a borrar
    const userId = req.userId; //id del usuario que comenta

    // Validación básica del ObjectId
    if (!Types.ObjectId.isValid(commentId)) {
      return res.status(400).json({ status: "error",message: "Invalid Id" });
    }
    
    const existingComment = await Comment.findById(commentId);
    if(!existingComment){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }

    if( existingComment.userId.toString() !== userId!.toString()){
      return res.status(403).json({ status:"error" ,message: "Unauthorized" });
    }

    await existingComment.deleteOne();
    
    return res.status(200).json({ status:"success", message: "Comment Deleted"});

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}