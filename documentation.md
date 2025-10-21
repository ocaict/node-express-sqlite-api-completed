# Building a RESTful API with SQLite, Node.js, and Express

🚀 Complete source code for the Udemy course: "Building a RESTful API with SQLite, Node.js, and Express"

## 📚 What You'll Learn

- Build RESTful APIs with Node.js & Express
- Implement SQLite database with raw SQL
- Structure code using MVC architecture
- Deploy to production with Render
- Keep API alive with cron jobs

🌐 Live Demo
API URL: [https://blog-post-api-iohi.onrender.com/posts/](https://blog-post-api-iohi.onrender.com/posts/)

## 🛠️ Tech Stack

- Node.js
- Express.js
- SQLite

## 🚀 Quick Start

1. Clone the repository

```bash
git clone [https://github.com/ocaict/blog_post_api.git]
cd blog-api-crash-course
```

2. Install dependencies
   `npm install`

3. Start the development server
   `npm run dev`

## Prerequisites

Before starting, make sure you have the following tools installed on your system:

### Required Software

1. **Visual Studio Code (VS Code)** - Free code editor

   - Download: [https://code.visualstudio.com/](https://code.visualstudio.com/)

2. **Node.js & npm** - JavaScript runtime and package manager

   - Download: [https://nodejs.org/](https://nodejs.org/)
   - This will install both Node.js and npm

3. **Postman** - API testing tool

   - Download: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

4. **DB Browser for SQLite** - Visual database management tool

   - Download: [https://sqlitebrowser.org/](https://sqlitebrowser.org/)

5. **Git** - Version control system
   - Download: [https://git-scm.com/downloads](https://git-scm.com/downloads)

## Getting Started

### Step 1: Initialize Your Project

1. Create a new folder for your project and navigate to it in your terminal
2. Initialize a new Node.js project:

```bash
npm init -y
```

### Step 2: Install Dependencies

Install the required production dependencies:

```bash
npm install express sqlite3 cors dotenv
```

Install development dependencies:

```bash
npm install nodemon -D
```

### Step 3: Set Up Project Structure

Create the following folder structure in your project root:

```
project/
├── controllers/
├── models/
├── db_config/
├── routes/
├── middlewares/
├── database/
└── /utils
```

## Database Configuration

## Database Schema

Your posts table will have the following structure:

| Column             | Type         | Constraints                |
| ------------------ | ------------ | -------------------------- |
| id                 | INTEGER      | PRIMARY KEY, AUTOINCREMENT |
| title              | VARCHAR(255) | NOT NULL                   |
| content            | TEXT         | NOT NULL                   |
| author             | TEXT         | NOT NULL                   |
| category           | TEXT         | DEFAULT NULL               |
| featured_image_url | VARCHAR(500) | DEFAULT NULL               |
| created_at         | DATETIME     | DEFAULT CURRENT_TIMESTAMP  |
| updated_at         | DATETIME     | DEFAULT CURRENT_TIMESTAMP  |

### Step 4: Create Database Connection

1. Create a file `db_config/database.js`
2. Copy and paste the following code:

```javascript
import sqlite3 from "sqlite3";
import fs from "fs";

const sqlite = sqlite3.verbose();

const createDB = (dbDir = "database", dbName = "postdb.db") => {
  let dbPath;
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir);
    dbPath = `${dbDir}/${dbName}`;
  } else {
    dbPath = `${dbDir}/${dbName}`;
  }

  const db = new sqlite.Database(dbPath, (err) => {
    if (err) return console.log(err);
    console.log("Connected database");
  });

  return db;
};

export default createDB;
```

### Step 5: Create Database Table

1. Create a file `models/Post.js`
2. First, import the database connection and create the database instance:

```javascript
import createDB from "../db_config/database.js";

const db = createDB();
```

3. Add the table creation code:

```javascript
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

// CREATE TABLE
db.serialize(() => {
  db.run(sqlQuery, (error) => {
    if (!error) return console.log("Table Created Successfully!");
    console.log("Error Creating Table", error);
  });
});
```

## CRUD Operations

### Step 6: Implement CRUD Functions

Add the following functions to your `models/Post.js` file:

#### Create a New Blog Post

```javascript
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
```

#### Get All Blog Posts

```javascript
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
```

#### Get a Single Blog Post by ID

```javascript
export const getPostById = (id) => {
  return new Promise((resolve, reject) => {
    const getQuery = `SELECT * FROM posts WHERE id = ?`;
    db.get(getQuery, [id], (error, post) => {
      if (!error) return resolve(post);
      return reject(error);
    });
  });
};
```

#### Update an Existing Blog Post

```javascript
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
```

#### Delete a Blog Post

```javascript
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
```

## Next Steps

After completing these steps, you'll have:

- ✅ A configured Node.js project with all necessary dependencies
- ✅ A SQLite database connection setup
- ✅ A posts table created in your database
- ✅ Complete CRUD operations for blog posts

### Package.json Scripts

Consider adding these scripts to your `package.json`:

```json
{
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  }
}
```
