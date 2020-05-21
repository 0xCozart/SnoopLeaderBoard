import sqlite3 from "sqlite3";
import path from "path";

const sqlite = sqlite3.verbose();
const dbPath = path.resolve(__dirname, "addresses.db");

// Opens address database
const db = new sqlite.Database(dbPath, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Connected to the in-memory SQLite database.");
});
