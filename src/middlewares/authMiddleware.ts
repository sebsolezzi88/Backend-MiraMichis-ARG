import {Request,Response,NextFunction} from 'express';
import dotenv from 'dotenv';
import  jwt  from 'jsonwebtoken';
import User from '../models/User';
import { ObjectId } from 'mongoose';


//obtemos la palabra secreta de las variable de entorno
dotenv.config();


interface DecodedToken extends jwt.JwtPayload {
    id: string;
    username: string;
}

export const verifyToken = async (req:Request,res:Response,next:NextFunction) => {
    
     /* Obtener el token de los headers de la solicitud 
        Comúnmente viene en el header 'Authorization' con el prefijo 'Bearer '
    */
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(!token){
         return res.status(401).json({ status:'error' ,message: 'token not provided' });
    }

    try {
        const decoded = jwt.verify(token,process.env.SECRET_KEY!) as DecodedToken;
        
        //verificar si el usuario esta en la base de datos
        const userExists = await User.findById(decoded.id);
        if(!userExists){
            return res.status(403).json({ status: 'error', message: 'invalid user' });
        }
        
        req.userId = userExists._id as ObjectId;
        req.userRol = userExists.role;
        next() //Continua la consulta 
        
    } catch (error:unknown) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ status: 'error', message: 'token expired' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            console.log(error);
            return res.status(401).json({ status: 'error', message: 'invalid token' });
        }
        return res.status(500).json({status:'error', message:'internal server error',error});
    }
}