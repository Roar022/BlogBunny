import express from "express"
import protect from "../middleware/authMiddleware";
import { addComment, deleteComment, getComments, getCommentsByBlogId } from "../controller/commentController";

const router = express.Router();

router.post("/add", protect, addComment)
router.get("/getAll", protect, getComments)
router.delete("/delete/:commentId", protect, deleteComment)
router.post("/getcomment", protect, getCommentsByBlogId)
export default router;