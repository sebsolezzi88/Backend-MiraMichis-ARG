import multer, { FileFilterCallback } from 'multer'; // Importa FileFilterCallback

const storage = multer.memoryStorage();

const uploadImage = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Opcional: límite de 5MB por archivo
  fileFilter: (req, file, cb: FileFilterCallback) => { // 
    // Si el tipo de archivo es una imagen, procede (callback con null para el error)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      // Si no es una imagen, devuelve un error (callback con un objeto Error)
      cb(new Error('Solo se permiten archivos de imagen!')); // Multer asume 'false' si pasas un Error
    }
  }
});

export default uploadImage;