import express from "express";
import protect from "../middleware/authMiddleware";
import { createBlog } from "../controller/blogController";

const router = express.Router();

router.post("/create", protect, createBlog);

export default router;
