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
