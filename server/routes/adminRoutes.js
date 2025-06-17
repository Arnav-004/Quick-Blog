import { Router } from 'express'
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from '../controllers/adminController.js'
import authenticate from '../middlewares/auth.js'

// create a new router instance
const adminRouter = Router()


adminRouter.post('/login', adminLogin)
adminRouter.get('/comments', authenticate, getAllComments)
adminRouter.get('/blogs', authenticate, getAllBlogsAdmin)
adminRouter.post('/delete-comments', authenticate, deleteCommentById)
adminRouter.post('/approve-comments', authenticate, approveCommentById)
adminRouter.get('/dashboard', authenticate, getDashboard)


export default adminRouter