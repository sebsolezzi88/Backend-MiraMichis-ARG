import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import CatPost from "../models/CatPost";
import { AuthRequest } from "../types/express";
import Comment from "../models/Commet";



export const createCatPost = async (req:Request,res:Response)=>{

    try {
    // 1. Verificar si hay un archivo de imagen
    if (!req.file) {
      return res.status(400).json({ status:'error', message: 'No se proporcionó ninguna imagen.' });
    }

    // 2. Subir la imagen a Cloudinary
    // req.file.buffer contiene los datos binarios de la imagen
    const result = await cloudinary.uploader.upload(req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
      folder: 'catposts', // Carpeta donde se guardarán las imágenes en Cloudinary
    });
    
    // 3. Obtener la URL y el ID público de la imagen de Cloudinary
    const photoUrl = result.secure_url; // URL segura de la imagen
    const photoId = result.public_id; // ID público de la imagen (útil para eliminarla después)
  
    const {
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      city,
      province,
    } = req.body;

    console.log(typeOfPublication,gender,description,city,province)
    //  Validar los datos (Express-validator se encargaría de esto en un caso real)
    if (!typeOfPublication || !gender || !description || !city  || !province) {
        return res.status(400).json({status:'error', message: 'Faltan campos obligatorios.' });
    }

    //  Obtener userId 
    const userId = req.userId; 

    const location = {city,province};

   
    // 7. Crear el nuevo post del gato
    const newCatPost = await CatPost.create({
      userId,
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      location,
      photoUrl,
      photoId
    })

    res.status(201).json({ 
      status:'success',
      message: 'Post de gato creado exitosamente.', 
      post: newCatPost 
    });

  } catch (error) {
    console.error('Error al crear el post del gato:', error);
    // Si la subida a Cloudinary falla y ya tienes un public_id, considera eliminarlo
    // Para evitar archivos huérfanos en Cloudinary si la parte de la DB falla.
    if (req.file && (error as any).public_id) { // Solo un ejemplo, la lógica real es más compleja
      await cloudinary.uploader.destroy((error as any).public_id);
    }
    res.status(500).json({ status:'error',message: 'Error interno del servidor al crear el post.' });
  }
}

export const getAllCatPosts = async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const existingPosts = await CatPost.find();
    
    return res.status(200).json({ status:"success", message: "Found Posts", posts:existingPosts });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const getCatPostById = async (req: Request, res: Response): Promise<Response> => {
  try {
    
    const {id} = req.params;

    const existingPost = await CatPost.findById(id);

    if(!existingPost){
      return res.status(404).json({ status:"error", message: "Post not Found"});
    }
    
    return res.status(200).json({ status:"success", message: "Post Found", post:existingPost });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const deleteCatPostById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const existingPost = await CatPost.findById(id);
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "CatPost not found" });
    }

    //Si existe el post comprobamos que pertenesca al mismo usuario
    if(!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString() ){
      return res.status(403).json({ status:"error" ,message: "Unauthorized: You do not own this post" });
    }

    //Si exite borramos de la base de datos la foto
    await cloudinary.uploader.destroy(existingPost.photoId);

    //Borra todos los comentarios relacionados al post
    await Comment.deleteMany({ catPostId: id });

    //Borramos el post
    await existingPost.deleteOne();

    return res.status(200).json({ status:"success", message: "CatPost deleted" });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}

export const updateCatPostById = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const {
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      city,
      province,
    } = req.body;

    const existingPost = await CatPost.findById(id);

    if (!existingPost) {
      return res.status(404).json({ message: "CatPost not found" });
    }
     // Verificar que el post le pertenece al usuario logueado
    if (!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString()) {
      return res.status(403).json({ message: "Unauthorized: You do not own this post" });
    }

    // Si hay nueva imagen
    if (req.file) {
      // Borrar la imagen anterior en Cloudinary
      if (existingPost.photoId) {
        await cloudinary.uploader.destroy(existingPost.photoId);
      }

      const result = await cloudinary.uploader.upload(req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
      folder: 'catposts', // Carpeta donde se guardarán las imágenes en Cloudinary
    });
    
        //Obtener la URL y el ID público de la imagen de Cloudinary
        const photoUrl = result.secure_url; // URL segura de la imagen
        const photoId = result.public_id; // ID público de la imagen (útil para eliminarla después)

      existingPost.photoUrl = photoUrl;
      existingPost.photoId = photoId;
    }

    // Actualizar otros campos
    existingPost.typeOfPublication = typeOfPublication;
    existingPost.gender = gender;
    existingPost.catName = catName;
    existingPost.age = age;
    existingPost.description = description;
    existingPost.breed = breed;
    existingPost.location = { city, province };

    await existingPost.save();

    return res.status(200).json({ message: "CatPost updated", post: existingPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateCatPostStatus = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const existingPost = await CatPost.findById(id);
    
    if(!existingPost){
      return res.status(404).json({ status:"error", message: "CatPost not found" });
    }

    //Si existe el post comprobamos que pertenesca al mismo usuario
    if(!existingPost.userId || existingPost.userId.toString() !== req.userId!.toString() ){
      return res.status(403).json({ status:"error" ,message: "Unauthorized: You do not own this post" });
    }

    //Cambiar el estado del post
    if(existingPost.publicationStatus === 'resuelto'){
      existingPost.publicationStatus = 'activo';
    }else{
      existingPost.publicationStatus = 'resuelto';
    }

    await existingPost.save() //Guardar cambios;
    
    return res.status(200).json({ status:"success", message: "Status change" });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}
export const getCatPostsByUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;
    
    const existingPosts = await CatPost.find({ userId});
    
    return res.status(200).json({ status:"success", message: "Post Found", posts:existingPosts });

  } catch (error) {
    console.error("Error delete post:", error);
    return res.status(500).json({ status:"error", message: "Server error" });
  }
}