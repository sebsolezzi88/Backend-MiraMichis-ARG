import { ObjectId } from 'mongoose';
import {Request} from 'express';
import { Rol } from '../../models/User';

declare global {
  namespace Express {
    interface Request {
      userId?: ObjectId; 
      userRol?: string; 
    }
  }
}

export interface AuthRequest extends Request {
  userId: ObjectId; // Aquí los haces NO opcionales porque sabes que verifyToken los establece
  userRol: string;  // Si verifyToken garantiza que siempre estarán presentes
}