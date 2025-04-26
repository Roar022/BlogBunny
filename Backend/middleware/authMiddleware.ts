import { PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
const jwt = require('jsonwebtoken');

interface AuthenticatedRequest extends Request {
    user?: any;
}

const protect = asyncHandler(async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            res.status(401).json({ message: "No token provided, authorization denied" });
            return;
        }
        
        const token = authHeader.split(" ")[1];  // Extract the token from "Bearer <token>"
        if (!token) {
            res.status(401).json({ message: "Token is missing, authorization denied" });
            return;
        }

        // Verify the token
        const verified = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
        console.log("verified",verified);

        // Get user info from the token
        const prisma = new PrismaClient();
        const user = await prisma.user.findUnique({
            where: {
                id: verified.id,
            },
        });
        console.log(user);
        if (!user) {
            res.status(401).json({ message: "User not found, please login" });
            return;
        }

        req.user = {
            username: user.username,
            email: user.email,
            id: user.id,
            location: user.location,
        };

        next();  // Proceed to the next middleware or route handler

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Not authorized, please login" });
    }
});

export default protect;
