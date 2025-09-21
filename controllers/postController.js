// Post Controllers
import {
  findAllPost,
  findPostById,
  createPost,
  updatePost,
  deletePost,
  findPostByCategory,
  findPostByAuthor,
} from "../model/Post.js";

export const createPostController = async (req, res) => {
  const { title, content, author, category } = req.body;

  if (!title || !content || !author)
    return res
      .status(400)
      .json({ success: false, message: "Enter all the required fields" });
  const newPost = {
    title,
    content,
    author,
    category: category ? category : null,
  };
  try {
    const post = await createPost(newPost);
    return res.status(201).json({ success: true, post });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getAllPostController = async (req, res) => {
  const { category, author } = req.query;
  let posts = [];
  try {
    if (!category && !author) {
      posts = await findAllPost();
      return res.json({
        success: true,
        posts,
      });
    } else if (category && !author) {
      posts = await findPostByCategory(category);
      return res.json({
        success: true,
        posts,
      });
    } else if (author && !category) {
      posts = await findPostByAuthor(author);
      return res.json({
        success: true,
        posts,
      });
    }
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
      .json({ success: false, message: "Enter the required fields" });
  const updatedPost = {
    title,
    content,
    author,
    category: category ? category : null,
  };

  try {
    const post = await updatePost({ id, ...updatedPost });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    await deletePost(id);
    return res.status(200).json({
      success: true,
      message: `Post with ID '${id}' deleted successfully`,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
