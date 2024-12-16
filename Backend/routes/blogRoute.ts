import express from "express"
import protect from "../middleware/authMiddleware";
import { createBlog, deleteBlog, dislikeBlog, getAllBlogs, getAllBlogsExceptUser, getBlogById, getUserBlog, isLikedBlog, likeBlog, updateBlog } from "../controller/blogController";

 const router = express.Router();

router.post("/create", protect, createBlog)
router.post("/update", protect, updateBlog)
router.get("/getblogbyId/:blogId", getBlogById)
router.get("/getuserblog",protect, getUserBlog)
router.delete("/delete/:blogId", protect, deleteBlog)
router.post("/likeblog", protect, likeBlog)
router.post("/dislikeblog", protect, dislikeBlog)
router.get("/getblogs", getAllBlogs)
router.get("/getblogsexceptuser", protect,getAllBlogsExceptUser)
router.post("/getisLiked",protect, isLikedBlog )

export default router;