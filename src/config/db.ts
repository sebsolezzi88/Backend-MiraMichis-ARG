import mongoose from "mongoose";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env
dotenv.config();

export const getMongoConnection = () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error("❌ No se encontró la variable MONGO_URI en el archivo .env");
  }

  mongoose.connect(uri)
    .then(() => console.log("✅ Conectado a MongoDB"))
    .catch((err) => console.error("❌ Error de conexión:", err));
};