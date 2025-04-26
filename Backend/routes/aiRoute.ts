import express from "express";
import { suggestBlogContent,suggestTrendingTitles } from "../controller/aiController";

import protect from "../middleware/authMiddleware";

const router = express.Router();
router.post("/suggest-content", protect, suggestBlogContent);
router.get("/trending-titles", protect, suggestTrendingTitles);
export default router;
