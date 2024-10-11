
import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute"
const cors = require("cors")
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv").config();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

const PORT =  5001;
app.get("/", (req:any,res:any)=>{
  return res.send("Hi there")
})

app.use("/api/users", userRoute);

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
