import createDB from "../db_config/database.js";

const db = createDB();

// CREATE TABLE
const sqlQuery = `CREATE TABLE IF NOT EXISTS posts(
id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
title VARCHAR(250) NOT NULL,
content TEXT NOT NULL,
author TEXT NOT NULL,
category TEXT,
featured_image_url TEXT,
created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;

db.serialize(() => {
  db.run(sqlQuery, (error) => {
    if (!error) return console.log("Table Created Successfully!");
    console.log("Error Creating Table", error);
  });
});

// INSERT DATA
export const createPost = ({ title, content, author, category }) => {
  return new Promise((resolve, reject) => {
    const insertQuery = `INSERT INTO posts (title, content, author,category) VALUES(?, ?, ?, ?)`;
    const stmt = db.prepare(insertQuery);
    stmt.run([title, content, author, category], (error) => {
      if (!error) {
        return resolve({
          id: stmt.lastID,
          title,
          content,
          author,
          category,
        });
      }
      return reject(error);
    });
    stmt.finalize();
  });
};

// Get All Posts
export const getAllPost = () => {
  return new Promise((resolve, reject) => {
    const getAllQuery = `SELECT * FROM posts`;
    db.all(getAllQuery, (error, posts) => {
      if (!error) return resolve(posts);
      return reject(error);
    });
  });
};

// Get post by ID
export const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const getQuery = `SELECT * FROM posts WHERE id = ?`;
    db.get(getQuery, [id], (error, post) => {
      if (!error) return resolve(post);
      return reject(error);
    });
  });
};

// updatePost(postData) - Update existing post

export const updatePost = ({ title, content, author, category, id }) => {
  return new Promise((resolve, reject) => {
    const updateQuery = `UPDATE posts SET title = ?, content = ? , author = ?, category = ? WHERE id = ?`;
    const stmt = db.prepare(updateQuery);
    stmt.run([title, content, author, category, id], (error) => {
      if (!error) return resolve({ title, content, author, category, id });
      return reject(error);
    });
    stmt.finalize();
  });
};

// deletePost(id) - Delete post
export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    const deleteQuery = `DELETE FROM posts WHERE id = ?`;
    const stmt = db.prepare(deleteQuery);
    stmt.run([id], (error) => {
      if (!error) return resolve(id);
      return reject(error);
    });
  });
};
