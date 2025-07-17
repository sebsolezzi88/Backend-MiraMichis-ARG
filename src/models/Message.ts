import mongoose, { Schema, Document, Types } from "mongoose";

// Modelo para los mensajes privados
export interface IMessage extends Document {
  fromUserId: Types.ObjectId;
  toUserId: Types.ObjectId;
  text: string;
  sentAt: Date;
  read: boolean;
}

const MessageSchema: Schema = new Schema<IMessage>({
  fromUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  toUserId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  text: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Message = mongoose.model<IMessage>("Message", MessageSchema);
export default Message;