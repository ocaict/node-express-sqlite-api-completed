# Blog API with Node.js and SQLite

A simple blog API built with Node.js, Express, and SQLite database for creating, reading, updating, and deleting blog posts.

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
your-project/
├── db_config/
├── model/
├── databases/ (will be created automatically)
└── package.json
```

## Database Configuration

### Step 4: Create Database Connection

1. Create a file `db_config/db.js`
2. Copy and paste the following code:

```javascript
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
```

### Step 5: Create Database Table

1. Create a file `model/Post.js`
2. First, import the database connection and create the database instance:

```javascript
import createDB from "../db_config/db.js";
const db = createDB();
```

3. Add the table creation code:

```javascript
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
```

## CRUD Operations

### Step 6: Implement CRUD Functions

Add the following functions to your `model/Post.js` file:

#### Create a New Blog Post

```javascript
export const createPost = (post) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO posts (title, content, author, category) VALUES (?, ?, ?, ?)";
    const stmt = db.prepare(query);
    stmt.run(
      [post.title, post.content, post.author, post.category],
      function (err) {
        if (!err) {
          post.id = this.lastID;
          resolve(post);
        } else {
          return reject(err);
        }
      }
    );
    stmt.finalize();
  });
};
```

#### Get All Blog Posts

```javascript
export const findAllPost = () => {
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM posts", (err, posts) => {
      if (!err) return resolve(posts);
      return reject(err);
    });
  });
};
```

#### Get a Single Blog Post by ID

```javascript
export const findPostById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM posts WHERE id = ?`, [id], (err, post) => {
      if (err) return reject(err);
      return resolve(post);
    });
  });
};
```

#### Update an Existing Blog Post

```javascript
export const updatePost = (post) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(
      "UPDATE posts SET title = ?, content = ?, author = ?, category = ? WHERE id = ?"
    );
    stmt.run(
      [post.title, post.content, post.author, post.category, post.id],
      (err) => {
        if (!err) return resolve(post);
        return reject(err);
      }
    );
    stmt.finalize();
  });
};
```

#### Delete a Blog Post

```javascript
export const deletePost = (id) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM posts WHERE id = ?");
    stmt.run([id], (err) => {
      if (!err) return resolve(id);
      return reject(err);
    });
    stmt.finalize();
  });
};
```

## Next Steps

After completing these steps, you'll have:

- ✅ A configured Node.js project with all necessary dependencies
- ✅ A SQLite database connection setup
- ✅ A posts table created in your database
- ✅ Complete CRUD operations for blog posts

### To continue building your API:

1. **Create Express routes** to handle HTTP requests (GET, POST, PUT, DELETE)
2. **Set up middleware** for parsing JSON and handling CORS
3. **Create an app.js or server.js** file to start your Express server
4. **Test your endpoints** using Postman
5. **View your database** using DB Browser for SQLite

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

## Troubleshooting

- Make sure all dependencies are installed correctly
- Verify that your folder structure matches the import paths
- Check that you're using ES6 modules (add `"type": "module"` to your package.json)
- Ensure your database folder has write permissions

## Support

If you encounter any issues, check the console for error messages and verify that all prerequisites are properly installed.
