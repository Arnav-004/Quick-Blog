import fs from "fs"
import imagekit from "../config/imagekit.js";
import BlogDB from "../models/Blog.js";
import CommentDB from "../models/Comment.js";
import generate from "../config/gemini.js";

export const addBlog = async (req, res) => {
    try {
        // body is a JSON object it is parsed by express.json() middleware
        // but body contains a JSON object blog  this is seperately parsed here using JSON.parse
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file; // Assuming you're using multer for file uploads

        // Validate required fields
        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);
        console.log("File buffer created successfully");

        // upload the image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,   // Buffer of the file
            fileName: imageFile.originalname, // Name of the file
            folder: "/blogs"   // Optional: specify a folder in ImageKit
        })
        
        // this is not directly stored in database
        // it is first optimized through imagekit URL transformation 
        const optimizedImageUrl = imagekit.url({
            path: response.filePath, // Path of the uploaded file in ImageKit
            transformation: [{
                quality: "auto",  // auto compress the image
                format: "webp",   // convert to mordern format
                width: 1280       // resize the image to 1280px width
            }]
        })
        // now this url will be stored in the database

        await BlogDB.create({
            title,
            subTitle,
            description,
            category,
            image: optimizedImageUrl, // Store the optimized image URL
            isPublished         
        })

        res.status(201).json({ 
            success: true, 
            message: "Blog added successfully" 
        });

    } catch (error) {
        res.status(500).json({ success: false, message: "An error occurred while adding the blog", error: error.message });
    }
}



export const getAllBlogs = async (req, res) => {
    try{
        // get all blogs from database which are published
        const blogs = await BlogDB.find({ isPublished: true })
        res.status(200).json({ 
            success: true, 
            message: "Blogs fetched successfully", 
            blogs 
        });
    }catch(err){
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching blogs", 
            error: err.message 
        });
    }
}



export const getBlogById = async (req, res) => {
    try{
        const { blogId } = req.params
        const blog = await BlogDB.findById(blogId)
        if(!blog){
            return res.status(404).json({ 
                success: false, 
                message: "Blog not found" 
            });
        }
        res.status(200).json({ 
            success: true, 
            message: "Blog fetched successfully", 
            blog 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching the blog", 
            error: err.message 
        });
    }
}



export const deleteBlogById = async (req, res) => {
    try{
        const { id } = req.body
        await BlogDB.findByIdAndDelete(id)
        // delete all comments associated with the blog
        await CommentDB.deleteMany({ blog: id })

        res.status(200).json({ 
            success: true, 
            message: "Blog deleted successfully", 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while deleting the blog", 
            error: err.message 
        });
    }
}



export const togglePublish = async (req, res) => {
    try{
        const { id } = req.body
        const blog = await BlogDB.findById(id)
        blog.isPublished = !blog.isPublished 
        blog.save()

        res.status(200).json({ 
            success: true, 
            message: "Blog's status updated'", 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while updatind blog's status", 
            error: err.message 
        });
    }
}




export const addComment = async (req, res) => {
    try{
        const { blog, name, content } = req.body

        await CommentDB.create({
            blog,
            name,
            content
        })

        res.status(201).json({ 
            success: true, 
            message: "Comment added for review" 
        });

    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while adding comment", 
            error: err.message 
        });
    }
}




export const getBlogComments = async (req, res) => {
    try{
        const { blogId } = req.body

        const comments = await CommentDB.find({blog: blogId, isApproved: true}).sort({ createdAt: -1 })

        res.status(201).json({ 
            success: true, 
            comments
        });

    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching comment", 
            error: err.message 
        });
    }
}





export const generateContent = async (req, res) => {
    try {
        // get the topic of blog from the body
        const { prompt } = req.body

        // create API call to gemini to generate content
        const content = await generate( prompt + " GENERATE A BLOG CONTENT FOR THIS TOPIC IN SIMPLE TEXT FORMAT" )
        
        res.status(200).json({ 
            success: true, 
            content 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message:  error.message 
        });
    }
}