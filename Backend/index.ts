
import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute"
import blogRoute from "./routes/blogRoute"

const cors = require("cors")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();
const app = express();

// used to parse cookie
app.use(cookieParser());

// Enables parsing of JSON request bodies
app.use(express.json());

// Parse incoming requests data
app.use(express.urlencoded({ extended: true }))

const PORT =  5001;
app.get("/", (req:any,res:any)=>{
  return res.send("Hi there")
})

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
