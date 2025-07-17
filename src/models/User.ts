import mongoose,{Schema,Document} from "mongoose";

export type Rol = "admin" | "user";

export interface Location {
    city:string;
    province: string;
}

export interface IUser extends Document {
  username: string;
  name: string;
  lastName: string;
  bio?: string;
  email: string;
  password: string;
  avatarUrl?: string;
  avatarId?: string;
  location: Location;
  role: Rol;
  isActive: boolean;             // Se activa tras validar el email
  activationToken?: string;      // Token para el enlace de activación
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
    username: {type: String, required:true, unique: true},
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    bio: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatarUrl: { type: String },
    avatarId: { type: String },
    location: {
        city: { type: String, required: true },
        province: { type: String, required: true },
    },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    isActive: { type: Boolean, default: false },
    activationToken: { type: String },
    createdAt: { type: Date, default: Date.now }
})

const User = mongoose.model<IUser>("User",UserSchema);
export default User;