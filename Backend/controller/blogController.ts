const asyncHandler = require("express-async-handler")
import {PrismaClient, User} from "@prisma/client"
import {  Request, Response} from "express";

// Extend the Request interface to include "USER" property
interface AuthenticatedRequest extends Request {
    user?: any;
}

export const createBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
    
    // Get the user from the request object
    const user = req.user;

    // Get the blog from the request body
    const blog = req.body;

    const {title, label, description}=blog;

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
    // updates blog in user
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { blogs: { connect: { id: newBlog.id } } },
      // include: { blogs: true , Comments: true}, // if we wanted to include the blogs and comments in the response
    });
    // console.log(updatedUser);

    // const userWithBlogs = await prisma.user.findUnique({
    //   where: {
    //     id: user.id, // or use email, username, etc.
    //   },
    //   include: {
    //     blogs: true, // Include the related blogs
    //   },
    // });
    // console.log(userWithBlogs);
    
    return res.status(200).json(newBlog)
})

export const updateBlog = asyncHandler(async(req:AuthenticatedRequest, res:Response)=>{
  const user = req.user;
  const body = req.body;
  const { blogId, title, label, description,   } = body;

  if (!blogId || !title || !label || !description) {
    throw new Error("All fields are required.");
  }

  const prisma = new PrismaClient();
  try{
    const existingBlog = await prisma.blog.findFirst({
      where: {
        id: blogId,
        userId: user.id,
      },
    });
  
    if (!existingBlog) {
      throw new Error("Blog not found or you do not have permission to update it.");
    }
  
    // Update the blog
    const updatedBlog = await prisma.blog.update({
      where: { id: blogId },
      data: {
        title,
        label,
        Description: description,
      },
    });
  
    return res.status(200).json({updatedBlog, status:"success"});
  }
  finally{
    await prisma.$disconnect();
  }
})
