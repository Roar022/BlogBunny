
import express, { Request, Response } from "express";
import userRoute from "./routes/userRoute"
import blogRoute from "./routes/blogRoute"
import { errorHandler } from "./middleware/errorMiddleware";
import commentRoute from "./routes/commentRoute"
import aiRoute from "./routes/aiRoute";

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
const corsOptions = {
  origin: "http://localhost:3000", // Allow frontend domain
  credentials: true, // Allow cookies to be sent and received
};
app.use(cors(corsOptions));
const PORT =  5001;
app.get("/", (req:any,res:any)=>{
  return res.send("Hi there")
})

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);
app.use("/api/comments",commentRoute);
app.use("/api/ai", aiRoute);


app.use(errorHandler)

app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`)
})
