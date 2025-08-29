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
