import jwt from 'jsonwebtoken';
import asyncHandler from "express-async-handler";
import { config } from "dotenv";

config()


const JWT_SECRET = 'eking@590'; 
// Middleware to validate JWT token
export const ValidateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Check if Authorization header contains a Bearer token
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]; // Extract the token from the Bearer string

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET, (err, decoded) => {
            if (err) {
                // Token verification failed (e.g., expired or invalid token)
                res.status(401);
                throw new Error('User is not authorized, invalid token');
            }
            
            // Attach the decoded user data to the request object
            // req.user = decoded.user.id;
            req.user = decoded.user1;
            next(); // Continue to the next middleware or route
        });
    } else {
        // No token found in the Authorization header
        res.status(401);
        throw new Error('Token is missing or not provided');
    }
});
