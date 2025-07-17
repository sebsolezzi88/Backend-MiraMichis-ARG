import mongoose,{Schema,Document, Types} from "mongoose";
import { Location } from "./User";

export type TypeOfPublication = "encontrado" | "perdido" | "adopción";
export type Gender = "macho" | "hembra" | "desconocido";
export type PublicationStatus = "activo" | "resuelto";

export interface ICatPost extends Document {
    userId: Types.ObjectId;
    typeOfPublication :TypeOfPublication;
    gender: Gender;
    catName?: string;
    age?: string;
    description: string;
    breed?: string; //campo opcional para la raza
    location :Location;
    date: Date;
    photoUrl: string;
    photoId: string;
    publicationStatus: PublicationStatus
}

export const CatPostSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    typeOfPublication: {
        type: String,
        enum: ["encontrado", "perdido", "adopción"],
        required: true
    },
    gender: {
        type: String,
        enum: ["macho", "hembra", "desconocido"],
        required: true
    },
    catName: {
        type: String,
        required: false // Campo opcional
    },
    age: {
        type: String,
        required: false // Campo opcional
    },
    description: {
        type: String,
        required: true
    },
    breed: {
        type: String,
        required: false // Campo opcional para la raza
    },
    location: {
        
        city: { type: String, required: true, index: true },
        province: { type: String, required: true }
    },
    date: {
        type: Date,
        default: Date.now, // Establece la fecha actual por defecto
        required: true
    },
    photoUrl: {
        type: String,
        required: true
    },
     photoId: {
        type: String,
        required: true
    },
    publicationStatus: {
        type: String,
        enum: ["activo", "resuelto"],
        default: "activo", // Por defecto, la publicación está activa
        required: true,
        index:true
    }
});


const CatPost = mongoose.model<ICatPost>('CatPost', CatPostSchema);

export default CatPost;