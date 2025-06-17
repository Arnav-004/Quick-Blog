import { model, Schema } from "mongoose";

const blogSchema = new Schema({
    title: { type: String, required: true },
    subTitle: { type: String },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    isPublished: { type: Boolean, required: true },
}, { timestamps: true });

const BlogDB = model("blogs", blogSchema);

export default BlogDB;