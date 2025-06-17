/**
 * Middleware configuration for handling file uploads using Multer.
 *
 * This sets up Multer with disk storage (default settings), allowing uploaded files
 * to be stored on the server's filesystem. The storage configuration is currently empty,
 * which means Multer will use default settings for destination and filename.
 */
import multer from  "multer"

//  it will parse the image and add it in req.file
const upload = multer({
    storage: multer.diskStorage({})
})

export default upload