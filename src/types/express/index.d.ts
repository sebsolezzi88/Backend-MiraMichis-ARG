import { Request } from 'express';
import { ObjectId } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId; // Deja como opcional aquí
      userRol?: string;  // Deja como opcional aquí
      file?: Express.Multer.File;
    }
  }
}

// Exporta AuthRequest. Esta SÍ garantiza la existencia de las propiedades.
export interface AuthRequest extends Request {
  userId: ObjectId;
  userRol: string;
}