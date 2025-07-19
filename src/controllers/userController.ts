import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import User from "../models/User";
import { transporter } from "../config/mail";
import cloudinary from "../config/cloudinary";

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

export const activateAccount = async (req: Request, res: Response): Promise<Response> => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    return res.status(400).json({ status: "error", message: "Token is missing or invalid." });
  }

  try {
    // Verificar el token
    const decoded: any = jwt.verify(token, process.env.SECRET_KEY!);

    // Buscar usuario por ID
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found." });
    }

    // Verificar que el token coincida
    if (user.activationToken !== token) {
      return res.status(403).json({ status: "error", message: "Invalid activation token." });
    }

    // Activar usuario
    user.isActive = true;
    user.activationToken = undefined;
    await user.save();

    return res.status(200).json({ status: "success", message: "Account activated successfully." });

  } catch (error) {
    console.error(error);
    return res.status(401).json({ status: "error", message: "Token is invalid or expired." });
  }
};
export const loginUser = async (req:Request,res:Response):Promise<Response> =>{
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        //El usuario no esta registrado
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        //Si los password no coinciden
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        //Si el usuario no esta activado
        if (!user.isActive) {
            return res.status(403).json({ message: 'Account not activated' });
        }

      
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY!, { expiresIn: '7d' });

        return res.status(200).json({ message: 'Login successful',username:user.username ,token });
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
}

export const updateProfile = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, lastName, bio, city, province } = req.body; // Campos del cuerpo de la solicitud

    const user = await User.findById(req.userId); 

    // Buena practica volver a verificar el username
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let photoUrl: string | undefined;
    let photoId: string | undefined;

    // --- Lógica para la imagen (Opcional) ---
    // 1. Verificar si hay un archivo de imagen en la solicitud
    if (req.file) { // Solo ejecuta esto si se proporcionó una imagen
      // 2. Subir la imagen a Cloudinary
      const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`, {
        folder: 'useravatar', // Carpeta donde se guardarán las imágenes en Cloudinary
      });

      // 3. Obtener la URL y el ID público de la imagen de Cloudinary
      photoUrl = result.secure_url;
      photoId = result.public_id;

      // Borrar la imagen anterior en Cloudinary (solo si se subió una nueva)
      if (user.avatarId) {
        await cloudinary.uploader.destroy(user.avatarId);
      }
      user.avatarUrl = photoUrl;
      user.avatarId = photoId;
    }
    // --- Fin de la lógica para la imagen ---

    // Actualizamos los datos del usuario (siempre se actualizan si están en el body)
    // Solo actualiza si los campos están presentes en el body, para permitir actualizaciones parciales
    if (name !== undefined) user.name = name;
    if (lastName !== undefined) user.lastName = lastName;
    if (bio !== undefined) user.bio = bio;
    
    // Asegurarse de que location exista antes de acceder a sus propiedades
    if (user.location) {
        if (city !== undefined) user.location.city = city;
        if (province !== undefined) user.location.province = province;
    } else {
        // Si no existe user.location, puedes inicializarlo o manejar el error
        user.location = { city: city || '', province: province || '' }; // Asumiendo que City y Province son strings
    }
      
    // Guardamos los cambios
    await user.save();

    return res.status(200).json({ status: 'success', message: 'Update successful', user }); 
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    // Puedes añadir lógica para borrar la imagen de Cloudinary si la subida fue exitosa
    // pero la actualización de la DB falló.
    return res.status(500).json({ status: 'error', message: 'Server error' });
  }
}