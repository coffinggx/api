import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: String,
    metaTitle: String,
    image: String,
    content: String,

},{timestamps: true});
const Blog = mongoose.model("Blog", blogSchema);
export default Blog