const asyncHandler = require("express-async-handler")
import {PrismaClient} from "@prisma/client"
import {  Request, Response} from "express";
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const generateToken = (id:string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: "1d" })
}
export const hashPassword =async (password:string)=>{
    // Hash passord
    // Encrypt password before saving to DB
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    password = hashedPassword;
    return password;
}

// Register User
export const registerUser = asyncHandler(async (req:Request, res:Response) => {
    console.log("req body", req.body);
    const {  email, password, username } = req.body;

    if ( !email || !password || !username) {
        res.status(400)
        throw new Error("Please fill in all required fields");
    }
    if (password.length < 6) {
        res.status(400)
        throw new Error("Password must be up to 6 characters")
    }

    const prisma = new PrismaClient();
    try {
        
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                  {
                    email: email
                  },
                  {
                    username: username
                  }
                ]
              }
          });
        
        if(user){
             throw new Error("Username or email is already taken.")
        }
    
        const hashedPassword =await hashPassword(password);
        
        const body = req.body;
        body.password = hashedPassword
        console.log(body)
       const savedUser = await prisma.user.create({
          data: body
        })
        // console.log(body);
        const token = generateToken(savedUser.id)
        res.cookie("signInToken", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite: "none",
            secure: true
        })
        
        return res.status(200).json({user:{
            email:savedUser.email,
            username: savedUser.username,
            location: savedUser.location,
            id: savedUser.id,
            token: token
        }, message:"Logged in successfully"});
    }
    finally{
        await prisma.$disconnect()
        
    }

   
})


// Login User
export const loginUser = asyncHandler(async (req:Request, res:Response) => {

// -------------------------------
const { email, password } = req.body;
    //Validate Request
    if (!email || !password) {
        res.status(400)
        throw new Error("Please add email and password");
    }
    //Check if user exists
    const prisma = new PrismaClient();
    try {
        
        const user = await prisma.user.findUnique({
            where: {
                email:email
            }
          });
        if (!user) {
            res.status(400)
            throw new Error("User not found, please signup");
        }
        //User exists, check if password is correct
        if(user.password){
    
            const passwordIsCorrect = await bcrypt.compare(password, user.password);
            if(!passwordIsCorrect){
                throw new Error("Email or Password is incorrect.")
            }
            // Generate Token 
        const token = generateToken(user.id)
        //Send HTTP-only cookie
    
            res.cookie("signInToken", token, {
                path: "/",
                httpOnly: true,
                expires: new Date(Date.now() + 1000 * 86400), // 1 day
                sameSite: "none",
                secure: true
            })
        return res.status(200).json({user:{
            email:user.email,
            username: user.username,
            location: user.location,
            id: user.id,
            token: token
        }, message:"Logged in successfully"});
        
        }
        else{
            throw new Error("Password is required");
        }
    } 
    finally{
        await prisma.$disconnect()

    }
//-------------------------

});

//logout user
export const logoutUser=asyncHandler(async (req:Request, res:Response) => {
    res.cookie("signInToken", null, {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // 1 day
        sameSite: "none",
        secure: true
    })
    return res.status(200).json({
        message:'Logout successful'});
})