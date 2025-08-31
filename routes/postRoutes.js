import { Router } from "express";
const router = Router();
import {
  createPostController,
  getAllPostController,
  findPostByIdController,
  updatePostController,
  deletePostController,
} from "../controllers/postController.js";

// POST /posts
router.post("/posts", createPostController);

// GET /posts
router.get("/posts", getAllPostController);

// GET /posts/:id
router.get("/posts/:id", findPostByIdController);

// PUT /posts/:id
router.put("/posts/:id", updatePostController);

// DELETE /posts/:id
router.delete("/posts/:id", deletePostController);

export default router;
