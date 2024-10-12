const asyncHandler = require("express-async-handler")
import {PrismaClient, User} from "@prisma/client"
import {  Request, Response} from "express";

// Extend the Request interface to include a user property
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
    const user = req.user;
    const body = req.body;
    const {title, label, description}=body;
    if(!title || !label || !description){
        throw new Error("All fields are required.");
    }
    const prisma = new PrismaClient();
    const newBlog = await prisma.blog.create({
        data: {
          title,
          label,
          Description: description,
          userId: user.id, // Assuming userId corresponds to an existing User in your database
        },
      });
      await prisma.user.update({
        where: { id: user.id },
        data: { blogs: { connect: { id: newBlog.id } } },
      });
    
    // console.log(req.user);
    return res.status(200).json(newBlog)
})