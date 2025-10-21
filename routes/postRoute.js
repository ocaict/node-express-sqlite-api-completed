import { Router } from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import notFound from "../notFound/notfound.js";
import errorHandler from "../errroHandler/errorHandler.js";
const router = Router();

router.get("/", (req, res) => {
  res.send({ message: "Server is running", success: true });
});

//  GET /posts (Get All Posts)
router.get("/posts", getAllPosts);

// GET /post/:id (Get a Single Post)
router.get("/posts/:id", getPost);

// POST /posts (Create a Post)
router.post("/posts", addPost);

// PUT /posts/:id (Update a Post)
router.put("/posts/:id", updatePost);

// DELETE /posts/:id (Delete a Post)
router.delete("/posts/:id", deletePost);

// Notfound - 404
router.use(notFound);

// Error Handler
router.use(errorHandler);

export default router;
