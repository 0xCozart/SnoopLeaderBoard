import * as sqlite3 from "sqlite3";
import * as path from "path";
import * as promise from "bluebird";

const Promise = promise.Promise;

const sqlite = sqlite3.verbose();
const dbPath: string = path.resolve(__dirname, "sqlite.db");

// Creates DAO for address database
class DAO {
  db: sqlite3.Database;
  constructor() {
    this.db = new sqlite.Database(dbPath, (err) => {
      if (err) {
        console.log("Could not connect to database", err);
      } else {
        console.log("Connected to database");
      }
    });
  }

  run(sql: string, params: any) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log("Error running sql " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(console.log("Resolved"));
        }
      });
    });
  }

  update(
    addresses: string[] | null,
    singleAddress: string | null,
    amount: number | null
  ) {
    // Ethereum address row insertion
    if (addresses) {
      let addressPlaceholders = addresses.map((address) => "(?)").join(",");
      let addressSQL =
        `INSERT INTO addresses (address) VALUES ` + addressPlaceholders;
      console.log("Updated:", addresses);
      return this.run(addressSQL, addresses);
    }

    if (singleAddress && amount) {
      let amountSQL = `
      UPDATE addresses
        SET amount = ?
        WHERE address = ?`;
      let data = [singleAddress, amount];
      console.log("Updated:", data);
      return this.run(amountSQL, data);
    }
  }

  delete(address: string) {
    let addressDelete = ` DELETE FROM addresses WHERE address = ?`;

    console.log("Deleted:", address);
    return this.run(addressDelete, [address]);
  }

  createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS addresses(
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      address text NOT NULL UNIQUE,
      amount integer NOT NULL DEFAULT 0)`;
    console.log("Table created");
    return this.run(sql, []);
  }

  get(address: string) {
    let getAddressSQL = `SELECT * FROM addresses WHERE address = ?`;
    return new Promise((resolve, reject) => {
      this.db.get(getAddressSQL, [address], (err, result) => {
        if (err) {
          console.log("Error running sql: " + address);
          console.log(err);
          reject(err);
        } else {
          console.log(result);
          resolve(result);
        }
      });
    });
  }

  all() {
    let allDataSQL = `SELECT address amount FROM addresses`;

    return new Promise((resolve, reject) => {
      this.db.all(allDataSQL, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + allDataSQL);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  allAddresses() {
    let allDataSQL = `SELECT address FROM addresses`;

    return new Promise((resolve, reject) => {
      this.db.all(allDataSQL, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + allDataSQL);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  close() {
    return this.db.close((err) => {
      if (err) {
        return console.error("Error closing database:", err);
      }
      console.log("Database closed.");
    });
  }
}

export default DAO;
