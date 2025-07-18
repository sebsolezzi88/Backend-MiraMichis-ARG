import { Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import CatPost from "../models/CatPost";

export const createCatPost = async (req:Request,res:Response)=>{

    try {
    // 1. Verificar si hay un archivo de imagen
    if (!req.file) {
      return res.status(400).json({ message: 'No se proporcionó ninguna imagen.' });
    }

    // 2. Subir la imagen a Cloudinary
    // req.file.buffer contiene los datos binarios de la imagen
    const result = await cloudinary.uploader.upload(req.file.path || `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
      folder: 'cat_posts', // Carpeta donde se guardarán las imágenes en Cloudinary
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

    // 5. Validar los datos (Express-validator se encargaría de esto en un caso real)
    if (!typeOfPublication || !gender || !description || !location) {
        return res.status(400).json({ message: 'Faltan campos obligatorios.' });
    }

    // 6. Obtener userId 
    const userId = req.userId; 

   
    // 7. Crear el nuevo post del gato
    const newCatPost =  CatPost.create({
      userId,
      typeOfPublication,
      gender,
      catName,
      age,
      description,
      breed,
      location: { city, province },
      photoUrl,
      photoId
    })

    res.status(201).json({ 
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
    res.status(500).json({ message: 'Error interno del servidor al crear el post.' });
  }
}