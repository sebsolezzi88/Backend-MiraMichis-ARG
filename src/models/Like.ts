import mongoose, { Schema, Document, Types } from "mongoose";

export interface ILike extends Document {
  catPostId: Types.ObjectId;
  userId: Types.ObjectId;
  likedAt: Date;
}

const LikeSchema: Schema = new Schema({
  catPostId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "CatPost",
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likedAt: {
    type: Date,
    default: Date.now,
  },
});

// Índice para prevenir múltiples likes del mismo usuario en un post
LikeSchema.index({ catPostId: 1, userId: 1 }, { unique: true });

const Like = mongoose.model<ILike>("Like", LikeSchema);
export default Like;