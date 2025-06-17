import jwt from "jsonwebtoken";
import BlogDB from "../models/Blog.js";
import CommentDB from "../models/Comment.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Check if the email and password match the admin credentials
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(401).json({success: false, message: "Invalid credentials" });
        }

        // If credentials are valid, create a JWT token
        const token = jwt.sign( {email}, process.env.JWT_SECRET);      
        console.log(token)
        res.status(200).json({
            message: "Login successful",
            success: true,
            token: token
        });

    } catch (error) {
        // Handle any errors that occur during the login process
        res.status(500).json({ message: "An error occurred during login", error: error.message });
    }

}




export const getAllBlogsAdmin = async (req, res) => {
    try{
        // Fetch all blogs from the database and sort them by creation date in descending order
        const blogs = await BlogDB.find({}).sort({ createdAt: -1 })

        res.status(200).json({ 
            success: true, 
            blogs 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching blogs", 
            error: err.message 
        });
    }
}




export const getAllComments = async (req, res) => {
    try{
        // Fetch all comments from the database and sort them by creation date in descending order
        console.log("comments are 1")
        const comments = await CommentDB.find({}).populate("blog").sort({ createdAt: -1 })
        console.log("comments are 2")
        console.log(comments)
        res.status(200).json({ 
            success: true, 
            comments 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching comments", 
            error: err.message 
        });
    }
}




export const getDashboard = async (req, res) => {
    try{
        const recentBlogs = await BlogDB.find({}).sort({createdAt: -1}).limit(5)
        const blogs = await BlogDB.countDocuments() // Count total number of blogs
        const comments = await CommentDB.countDocuments() // Count total number of comments
        const drafts = await BlogDB.countDocuments({ isPublished: false}) // Count total number of unpublished blogs

        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }

        res.status(200).json({ 
            success: true, 
            dashboardData 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "An error occurred while fetching dashboard data", 
        });
    }
}




export const deleteCommentById = async (req, res) => {
    try{
        const { id } = req.body
        await CommentDB.findByIdAndDelete(id)

        res.status(200).json({ 
            success: true, 
            message: "Comment deleted successfully" 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "can not delete comment", 
            error: err.message 
        });
    }
}




export const approveCommentById = async (req, res) => {
    try{
        const { id } = req.body
        await CommentDB.findByIdAndUpdate(id, { isApproved: true })

        res.status(200).json({ 
            success: true, 
            message: "Comment approved successfully" 
        });
    }catch(err) {
        res.status(500).json({ 
            success: false, 
            message: "could not approve comment", 
            error: err.message 
        });
    }
}