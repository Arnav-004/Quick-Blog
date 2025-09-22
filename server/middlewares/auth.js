import jwt from 'jsonwebtoken';
import UserDb from '../models/User.js';


const authenticate = async (req, res, next) => {
    try {
        // token is passed in the header as Authorization
        const token = req.headers.authorization
        if(!token) return res.json({ success: false, message: 'Token missing' });
        
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decoded) return res.status(403).json({ success: false, message: 'Invalid token' });
        
        const author = await UserDb.findById(decoded.author).select("-password");
        
        if(!decoded) return res.status(404).json({ success: false, message: 'User not found' });
        
        req.author = author;  
        next();
    } catch (err) {
        res.status(403).json({
            success: false,
            message: 'Invalid token'
        });
    }
};


export default authenticate;