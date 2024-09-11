import {uploadBlogs, getBlogs} from "../controllers/blogs.controller.js";

import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
const router = Router();

router.post('/blogs', upload.single('image'), uploadBlogs);
router.get("/blogs", getBlogs);
export default router
