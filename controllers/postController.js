/* 
getAllPosts() - GET /api/posts
findPostById() - GET /api/posts/:id
createPost() - POST /api/posts
updatePost() - PUT /api/posts/:id
deletePost() - DELETE /api/posts/:id
*/
import {
  findAllPost,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/Post.js";

export const getAllPostController = async (req, res) => {
  try {
    const posts = await findAllPost();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const findPostByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findPostById(id);
    if (post) {
      res.json({ success: true, post });
    } else {
      res.status(404).json({ success: false, message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ ...err });
  }
};

export const createPostController = async (req, res) => {
  const newPost = req.body;
  try {
    const createdPost = await createPost(newPost);
    res.status(201).json({ success: true, post: createdPost });
  } catch (err) {
    res.status(500).json({ ...err });
  }
};

export const updatePostController = async (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  try {
    await updatePost({ id, ...updatedPost });
    res.json({ success: true, post: { ...updatedPost, id } });
  } catch (err) {
    res.status(500).json({ ...err });
  }
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    res.json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ ...err });
  }
};
