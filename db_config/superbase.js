import { createClient } from "@supabase/supabase-js";
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert a new post
export const insertPost = async (post) => {
  const { data, error } = await supabase.from("posts").insert([post]);
  if (error) {
    return error;
  } else {
    console.log(data);
    //  Return the inserted post
    return post;
  }
};

// Function to get all posts
export const getPosts = async () => {
  const { data, error } = await supabase.from("posts").select("*");
  if (error) {
    return error;
  } else {
    return data;
  }
};

//function to get a post by id
export const getPostById = async (id) => {
  const { data, error } = await supabase.from("posts").select("*").eq("id", id);
  if (error) {
    return error;
  } else {
    return data[0];
  }
};

// Function to update a post by id
export const updatePostById = async (id, updatedPost) => {
  const { error } = await supabase
    .from("posts")
    .update(updatedPost)
    .eq("id", id);
  if (error) {
    return error;
  } else {
    return await getPostById(id);
  }
};

// Function to delete a post by id
export const deletePostById = async (id) => {
  const { error } = await supabase.from("posts").delete().eq("id", id);
  if (error) {
    return error;
  } else {
    return id;
  }
};
