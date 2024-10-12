import { PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
const jwt = require('jsonwebtoken');
interface AuthenticatedRequest extends Request {
    user?: any;
  }
const protect = asyncHandler(async (req:AuthenticatedRequest, res:Response, next) => {
    try {
        // console.log
        // const token = req.header('token');
        // console.log("HI there");
        // console.log(req.cookies.signInToken)
        const token = req.cookies.signInToken;
        if (!token) {
            res.status(401);
            throw new Error("Not authorized, please login")
        }

        //Verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET!) as {id:string};
        // Get user id from token
        // const user = await User.findById(verified.id).select("-password");
        if(!verified){
            throw new Error("Please Login.")
        }
        const prisma = new PrismaClient();

        const user = await prisma.user.findUnique({
            where:{
                id:verified.id
            }
        })
        if (!user) {
            res.status(401)
            throw new Error("User Not found")
        }
        req.user = {
           username: user.username,
           email: user.email,
           id: user.id,
           location: user.location

        }
        next();

    } catch (error) {
        res.status(401);
        throw new Error("Not authorized, please login")

    }
});


export default protect