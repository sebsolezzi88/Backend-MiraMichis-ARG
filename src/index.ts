import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import "./models/loadModels";
import { getMongoConnection } from "./config/db";
import userRoutes from './routes/userRoutes';
import catPostRoutes from './routes/catPostRoutes';
import catCommentRoutes from './routes/catCommentRoutes';
import blogPostRoutes from './routes/blogPostRoutes';
import messageRoutes from './routes/messageRoutes';


//Cargar variable de entorno
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();


app.use(cors());
app.use(express.json()); //Para leer los json

getMongoConnection(); //Conexion con la base de datos

app.use('/api/user',userRoutes); //Rutas de User
app.use('/api/catpost',catPostRoutes); //Rutas de catpost
app.use('/api/catpost',catCommentRoutes); //Rutas para los comentarios  de post de gatos
app.use('/api/message',messageRoutes); //Rutas para el envio y recepción de mensajes
app.use('/api/blog',blogPostRoutes); //Rutas para los comentarios  de post de blog(Solo admin)


app.listen(PORT, ()=>{
    console.log(`Server Express corriendo en puerto ${PORT}`);
})
