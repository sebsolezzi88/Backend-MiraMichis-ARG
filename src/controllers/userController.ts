import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import User from "../models/User";
import { transporter } from "../config/mail";

export const registerUser = async (req:Request,res:Response):Promise<Response> =>{
    try {
        //Comprobar errores
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()}); //Si hay errores los enviamos
        }

        //Hasheamos la contraseña que nos mandan en el req.body
        req.body.password = await bcrypt.hash(req.body.password,10);

        //Registrarmos al usuario.
        const newUser = await User.create(req.body);

        //Generar Token Para activar su cuenta
        const activationToken = jwt.sign({ id: newUser._id },
            process.env.SECRET_KEY!,
            { expiresIn: '1d' }
        );
        newUser.activationToken = activationToken; //Guardar token en el usuario creado
        await newUser.save();

        const activationUrl = `http://localhost:3000/api/user/activate?token=${activationToken}`;

        //Mandar mail
        await transporter.sendMail({
        from: '"Red Social de Michis 🐱" <no-reply@michinet.com>',
        to: newUser.email,
        subject: "Activa tu cuenta",
        html: `<p>Hola ${newUser.name}, activa tu cuenta dando clic en el siguiente enlace:</p>
                <a href="${activationUrl}">Activar cuenta</a>`
        });
        return res.status(200).json({status:'success', message: "User created. We send a confirmation email "});
    } catch (error) {
        return res.status(500).json({status:'error', message: "Server Error."});
    }
}