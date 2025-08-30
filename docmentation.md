## Development Environment Setup

We will be using these free tools:

Visual Studio Code (VS Code): Free code editor.
Download:
Node.js & npm: JavaScript runtime and package manager.
Download:
Postman: To test our API endpoints.
Download:
DB Browser for SQLite : A visual tool to view our database.
Download:
Git: For version control and deployment.
Download:

## Initialization & Installation

### Initializing a new Node.js project

`npm init -y`

### Install Dependencies

`Npm install express, SQLite3, cors, dotenv`

### Install deDependencies

`Npm install nodemon -D`

# Database Setup & Schema (Blog Post)

Connecting to SQLite Database
create db_config/db.js

Copy and Paste the code below

import fs from "fs";
import sqlite3 from "sqlite3";
const sqlite = sqlite3.verbose();

// Return db from the function
const createDB = (dbDir = "databases", dbName = "postdb.db") => {
let dbPath;
if (!fs.existsSync(dbDir)) {
fs.mkdirSync(dbDir, { recursive: true });
dbPath = `${dbDir}/${dbName}`;
} else {
dbPath = `${dbDir}/${dbName}`;
}
const db = new sqlite.Database(dbPath, (err) => {
if (!err) return console.log("Database Created or Already Exist");
console.log("Error Creating Database", err);
});
return db;
};
export default createDB;

# Creating A Table

Create a folder models/Post.js
Copy and Paste the code below

import createDB from "../db_config/db.js";
const db = createDB();

const tableQuery = `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT DEFAULT NULL,
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

# CRUD Operation Using SQLite & SQL & Commands

### We are going to create functions to perform CRUD operation with SQLITE

Function to CREATE blog post

export const createPost = (post) => {
return new Promise((resolve, reject) => {
const query =
"INSERT INTO posts (title, content, author, tags) VALUES (?, ?, ?, ?)";
const stmt = db.prepare(query);
stmt.run(
[post.title, post.content, post.author, JSON.stringify(post.tags)],
(err) => {
if (!err) {
post.id = stmt.lastID;
resolve({ success: true, posts: { ...post } });
} else {
return reject({ success: false, message: err.message });
}
}
);
});
};

Function to GET ALL POSTS

export const findAllPost = () => {
return new Promise((resolve, reject) => {
db.all(
"SELECT rowid AS id, title, content, author, tags FROM posts",
(err, posts) => {
if (err) {
reject({ success: false, message: err.message });
} else {
resolve({
success: true,
posts: posts.map((post) => ({
...post,
tags: JSON.parse(post.tags),
})),
});
}
}
);
});
};

Function to GET A SINGLE POST by ID
export const findPostById = (id) => {
return new Promise((resolve, reject) => {
db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, post) => {
if (!err) return resolve({ ...post, tags: JSON.parse(post.tags) });
return reject({ success: false, messsage: err.message });
});
});
};

Function to UPDATE POST

export const updatePost = (post) => {
return new Promise((resolve, reject) => {
const stmt = db.prepare(
"UPDATE posts SET title = ?, content = ?, author=?, tags=? WHERE id = ?"
);
stmt.run(
[post.title, post.content, post.author, post.tags, post.id],
(err) => {
if (!err) return resolve({ success: true, post });
return reject({ success: false, message: "Unable to update post" });
}
);
stmt.finalize();
});
};

Function to DELETE POST

export const deletePost = (id) => {
return new Promise((resolve, reject) => {
const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
stmt.run([id], (err) => {
if (!err) return resolve({ success: true, id });
return reject({ success: false });
});
});
};
