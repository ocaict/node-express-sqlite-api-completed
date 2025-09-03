// Post Controllers
import {
  findAllPost,
  findPostById,
  createPost,
  updatePost,
  deletePost,
} from "../models/Post.js";

export const createPostController = async (req, res) => {
  const { title, content, author, category } = req.body;

  if (!title || !content || !author)
    return res
      .status(400)
      .json({ success: false, message: "Enter the rquired fields" });
  const newPost = {
    title,
    content,
    author,
    category: category ? category : null,
  };
  try {
    const result = await createPost(newPost);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllPostController = async (req, res) => {
  try {
    const { posts } = await findAllPost();
    res.json({
      success: true,
      posts,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const findPostByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await findPostById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });

    return res.status(200).json({ success: true, post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updatePostController = async (req, res) => {
  const { id } = req.params;
  const { title, content, author, category } = req.body;

  if (!title || !content || !author)
    return res
      .status(400)
      .json({ success: false, message: "Enter the rquired fields" });
  const updatedPost = {
    title,
    content,
    author,
    category: category ? category : null,
  };

  try {
    const result = await updatePost({ id, ...updatedPost });
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    return res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
