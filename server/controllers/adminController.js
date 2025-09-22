import jwt from "jsonwebtoken";
import BlogDB from "../models/Blog.js";
import CommentDB from "../models/Comment.js";
import UserDb from '../models/User.js'
import bcrypt from 'bcryptjs'



export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        // Check if all fields are provided
        if( !username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if user already exists
        const existingUser = await UserDb.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await UserDb.create({
            username,
            email,
            password: hashedPassword
        });

        // generate token
        const token = jwt.sign({ author: newUser._id }, process.env.JWT_SECRET) 

        res.status(201).json({
            success: true,
            userData: newUser,
            token: token, 
            message: 'Account created successfully.'
        })
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find user by email
        const user = await UserDb.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Email.' });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Password.' });
        }

        // Generate token
        const token = jwt.sign({ author: user._id }, process.env.JWT_SECRET) 

        res.json({
            success: true,
            userData: user,
            token: token,
            message: 'Login successful.'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






export const getAllBlogsAdmin = async (req, res) => {
    const authorId = req.author._id

    try{
        // Fetch all blogs from the database and sort them by creation date in descending order
        const blogs = await BlogDB.find({blogAuthor: authorId}).sort({ createdAt: -1 })

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
    const authorId = req.author._id

    try{
        // Fetch all comments from the database and sort them by creation date in descending order
        const comments = await CommentDB.find({blogAuthor: authorId}).populate("blog").sort({ createdAt: -1 })

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
    const authorId = req.author._id

    try{
        const recentBlogs = await BlogDB.find({blogAuthor: authorId}).sort({createdAt: -1}).limit(5)
        const blogs = await BlogDB.countDocuments({blogAuthor: authorId}) // Count total number of blogs
        const comments = await CommentDB.countDocuments({blogAuthor: authorId}) // Count total number of comments
        const drafts = await BlogDB.countDocuments({blogAuthor: authorId, isPublished: false}) // Count total number of unpublished blogs

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