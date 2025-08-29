import { Router } from "express";
const router = Router();
import {
  createPostController,
  getAllPostController,
  findPostByIdController,
  updatePostController,
  deletePostController,
} from "../controllers/postController.js";
// GET /posts
router.get("/posts", getAllPostController);

// GET /posts/:id
router.get("/posts/:id", findPostByIdController);

// POST /posts
router.post("/posts", createPostController);

// PUT /posts/:id
router.put("/posts/:id", updatePostController);

// DELETE /posts/:id
router.delete("/posts/:id", deletePostController);

export default router;
