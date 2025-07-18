import { NextFunction, Request, Response } from "express";


export const verifyRolAdmin = async (req:Request,res:Response,next:NextFunction) => {
    if(req.userRol !== 'admin'){
        return res.status(403).json({
            status:'error',
            message:'Forbidden'
        })
    }
    next();
}