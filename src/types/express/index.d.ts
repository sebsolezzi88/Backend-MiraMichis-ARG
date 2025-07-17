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