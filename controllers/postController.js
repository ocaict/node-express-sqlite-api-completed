import * as db from "../models/Post.js";
import * as superbase from "../db_config/superbase.js";

export const getAllPosts = async (req, res) => {
  try {
    //const posts = await db.getAllPost();
    const posts = await superbase.getPosts();
    res.send({ success: true, posts });
  } catch (error) {
    console.log("Error in get all posts controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getPost = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const post = await superbase.getPostById(id);
    if (!post)
      return res
        .status(404)
        .send({ success: false, message: "Post Not Found" });
    res.send({ success: true, post });
  } catch (error) {
    console.log("Error in getting a single post controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addPost = async (req, res) => {
  const { title, content, author, category, featured_image_url } = req.body;
  if (!title || !content || !author)
    return res
      .status(400)
      .json({ success: false, message: "Enter all the required fields" });

  try {
    const result = await superbase.insertPost({
      title,
      content,
      author,
      category: category ? category : "",
      featured_image_url: featured_image_url ? featured_image_url : "",
    });
    return res.status(201).json({ success: true, post: result });
  } catch (error) {
    console.log("Error in adding new post controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const { title, content, author, category } = req.body;
  if (!title || !content || !author)
    return res
      .status(400)
      .json({ success: false, message: "Enter all the required fields" });

  try {
    // const updatedPost = await db.updatePost({
    //   id,
    //   title,
    //   content,
    //   author,
    //   category: category ? category : "",
    // });
    const updatedPost = await superbase.updatePostById(id, {
      title,
      content,
      author,
      category: category ? category : "",
    });

    return res.status(200).json({ success: true, post: updatedPost });
  } catch (error) {
    console.log("Error in updating a post controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    // const result = await db.deletePost(id);
    const result = await superbase.deletePostById(id);
    return res.status(200).json({
      success: true,
      message: `Post with ID '${result}' deleted successfully`,
    });
  } catch (error) {
    console.log("Error in deletting a post controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
