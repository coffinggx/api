import { uploadOnCloudinary } from "../cloudinary.js";
import Blog from "../models/blogs.model.js";

import upload from '../middlewares/multer.middleware.js';

const uploadBlogs = async (req, res) => {
    try {
        const { title, metaTitle, content } = req.body;
        if ([title, metaTitle, content].some((field) => field?.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }
        console.log(title, metaTitle, content);
        
        let imageUrl = null;
        if (req.file) { // Change this to req.file if you're uploading a single file
            const imageLocalPath = req.file.path;
            if (imageLocalPath) {
                const uploadedImage = await uploadOnCloudinary(imageLocalPath);
                if (uploadedImage) {
                    imageUrl = uploadedImage.url;
                    console.log("Image uploaded:", imageUrl);
                }
            }
        }
        const blog = await Blog.create({
            title,
            metaTitle,
            image: imageUrl, // Changed from imageUrl to image to match the schema
            content,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find(); // Retrieves all documents in the collection
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export  {
    uploadBlogs,
    getBlogs
}