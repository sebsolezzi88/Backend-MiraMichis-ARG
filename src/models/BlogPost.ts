import mongoose,{Schema,Document, ObjectId, Types} from "mongoose";

export type TypeOfBlogPost = "noticia" | "evento" | "salud" | "educación" | "video"


interface IBlogPost extends Document{
    title: string;
    text:string;
    userId: Types.ObjectId;
    link?: string;
    typeOfBlogPost: TypeOfBlogPost;
    createdAt:Date;
}

const BlogPostSchema = new Schema<IBlogPost>({
    title: {type:String, required:true},
    text: {type:String, required:true},
    userId:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    link:{
        type:String
    },
    typeOfBlogPost:{
        type: String,
        enum: ["noticia" , "evento" , "salud" , "educación" , "video"],
        required: true
    },
    createdAt:{type:Date, default: Date.now}
});

const BlogPost = mongoose.model<IBlogPost>("BlogPost",BlogPostSchema);
export default BlogPost;