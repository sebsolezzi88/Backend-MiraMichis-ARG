import { Request, Response } from "express";

export const createCatPost = async (req:Request,res:Response):Promise<Response> =>{

    try {
        // Campos del formulario
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

    console.log(req.userId);
    
      return res.status(201).json({ message: 'CatPost created' });
    } catch (error) {
      console.error("Create error:", error);
        return res.status(500).json({ message: 'Server error' });
    }
}