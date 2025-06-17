import { Router } from "express";
import { addBlog, addComment, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogComments, togglePublish } from "../controllers/blogController.js";
import authenticate from "../middlewares/auth.js";
import upload from "../middlewares/multer.js";

const blogRouter = Router()

// Blog routes
blogRouter.post('/add', upload.single('image'), authenticate, addBlog)
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogById)
blogRouter.post('/delete', authenticate, deleteBlogById)
blogRouter.post('/toggle-publish', authenticate, togglePublish)

// Comment routes
blogRouter.post("/add-comment", addComment)
blogRouter.post("/comments", getBlogComments)

// google gemini AI route
blogRouter.post('/generate', authenticate, generateContent )

export default blogRouter;