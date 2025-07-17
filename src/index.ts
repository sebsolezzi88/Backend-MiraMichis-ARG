import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "./models/loadModels";
import { getMongoConnection } from "./config/db";

//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json()); //Para leer los json

getMongoConnection(); //Conexion con la base de datos

app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})
