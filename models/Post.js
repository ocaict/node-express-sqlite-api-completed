/* 
Database interaction methods
*/
import createDB from "../db_config/db.js";
const db = createDB();

const tableQuery = `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT DEFAULT NULL,
    featured_image_url VARCHAR(500) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`;

// CREATE TABLE
db.serialize(() => {
  db.run(tableQuery, (err) => {
    if (!err) return console.log("Table Created");
    console.log("Unable to create Table", err);
  });
});

//create(postData) - Create new post
export const createPost = (post) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO posts (title, content, author,category) VALUES (?, ?, ?, ?)";
    const stmt = db.prepare(query);
    stmt.run([post.title, post.content, post.author, post.category], (err) => {
      if (!err) {
        post.id = stmt.lastID;
        resolve({ success: true, posts: { ...post } });
      } else {
        return reject({ success: false, message: err.message });
      }
    });
  });
};

// findAllPost() - Get all posts
export const findAllPost = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM posts", (err, posts) => {
      if (err) return reject({ success: false, message: err.message });
      return resolve({
        success: true,
        posts,
      });
    });
  });
};

// findPostById(id) - Get post by ID
export const findPostById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, post) => {
      if (err) return reject({ success: false, message: err.message });
      return resolve(post);
    });
  });
};

// updatePost(postData) - Update existing post
export const updatePost = (post) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ?, author=?, category = ? WHERE id = ?"
    );
    stmt.run(
      [post.title, post.content, post.author, post.category, post.id],
      (err) => {
        if (!err) return resolve({ success: true, post });
        return reject({ success: false, message: "Unable to update post" });
      }
    );
    stmt.finalize();
  });
};

// deletePost(id) - Delete post
export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    stmt.run([id], (err) => {
      if (!err) return resolve({ success: true, id });
      return reject({ success: false });
    });
  });
};
