import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware";
import { getMessageReceived, getMessageSended, markMessageRead, sendMessage } from "../controllers/messageController";



const router = Router();

router.post('/',verifyToken,sendMessage); //Ruta para enviar mensaje
router.get('/send',verifyToken,getMessageSended); //Ruta para obtener los mensajes recibidos
router.get('/inbox',verifyToken,getMessageReceived); //Ruta para ver los mensajes recibidos
router.patch('/read/:idMessage',verifyToken,markMessageRead); //Marcar un mensaje como leido


export default router;
