import express from "express"
import {loginUser, logoutUser, registerUser } from "../controller/userController"
import protect from "../middleware/authMiddleware";
 const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout",protect,logoutUser)

export default router;