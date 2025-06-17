import jwt from 'jsonwebtoken';


const authenticate = (req, res, next) => {
    try {
        // token is passed in the header as Authorization
        const token = req.headers.authorization
        
        // Verify the token using the secret key
        jwt.verify(token, process.env.JWT_SECRET)
        next();
    } catch (err) {
        res.status(403).json({
            success: false,
            message: 'Invalid token'
        });
    }
};

export default authenticate;