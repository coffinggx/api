import {uploadBlogs, getBlogs} from "../controllers/blogs.controller.js";

import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { loginUser, registerUser, logoutUser } from "../controllers/users.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.post('/blogs', upload.single('image'), uploadBlogs);
router.get("/blogs", getBlogs);
router.post("/login", loginUser)
router.post("/register",registerUser)
router.post("/logout",verifyJWT, logoutUser)
export default router
