import { PrismaClient } from "@prisma/client";
import express from "express";
import mongoose from "mongoose"; // Use ES6 import style for consistency

const dotenv = require("dotenv").config();
const app = express(); // Explicitly define `app` as an Application type

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
  return res.send("Hi there");
});

mongoose
  .connect(process.env.DATABASE_URL as string)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port ${PORT}`);
    });
  })
  .catch((err: any) => {
    console.log(err);
  });
