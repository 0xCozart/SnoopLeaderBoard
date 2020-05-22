import * as sqlite3 from "sqlite3";
import * as path from "path";
import Promise, { reject } from "bluebird";

const sqlite = sqlite3.verbose();
const dbPath: string = path.resolve(__dirname, "sqlite.db");
const database = new sqlite.Database(dbPath, (err) => {
  if (err) {
    return console.error("FAILED DATABASE CONNECTION:", err);
  }
  console.log("Conencted to database.");
});

// Creates DAO for address database
class DB {
  db: sqlite3.Database;
  constructor() {
    this.db = await new sqlite.Database(dbPath, (err) => {
      if (err) {
        return console.error("FAILED DATABASE CONNECTION:", err);
      }
      console.log("Conencted to database.");
    });;
  }

  async createTable() {
    let sql = `CREATE TABLE IF NOT EXISTS addresses(
      id integer NOT NULL PRIMARY KEY AUTOINCREMENT,
      address text NOT NULL UNIQUE,
      amount integer NOT NULL DEFAULT 0)`;
    return await this.db.run(sql, (err) => {
      if (err) {
        return console.error("TABLE CREATION ERROR", err.message);
      }
      console.log("Address table created.");
    });
  }

  dataUpdate(
    addresses: string[] | null,
    singleAddress: string | null,
    amount: number | null
  ) {
    // addresses = addresses || null;
    // singleAddress = singleAddress || null;
    // amount = amount || null;

    // Ethereum address row insertion
    if (addresses) {
      let addressPlaceholders = addresses.map((address) => "(?)").join(",");
      let addressSQL =
        `INSERT INTO addresses (address) VALUES ` + addressPlaceholders;

      return new Promise ((resolve, reject) => {
        this.db.run(addressSQL, addresses, (err) => {
          if (err) {
            console.log(err.message);
            reject(err)
          }
          resolve(console.log(`Address inserted: ${addressPlaceholders.length}`));
      });
    }}

    if (singleAddress && amount) {
      let amountSQL = `
        UPDATE addresses
          SET amount = ?
          WHERE address = ?`;
      return new Promise((resolve, reject) => {return this.db.run(amountSQL, [singleAddress, amount], (err) => {
        if (err) {
          return console.error("ERROR ENTERING AMOUNT:", err.message);
        }
        console.log(`UPDATED: ${singleAddress}, ${amount}`);
      })});
    }
  }

  async delete(address: string) {
    let addressDelete = ` DELETE FROM addresses WHERE address = ?`;

    return await this.db.run(addressDelete, [address], (err) => {
      if (err) {
        return console.error("ERROR DELETING ADDRESS:", err.message);
      }
      console.log("Deleted:", address);
    });
  }

  async get(address: string) {
    let getAddressSQL = `SELECT * FROM addresses WHERE address = ?`;
    let output;
    return (output = await this.db.get(
      getAddressSQL,
      [address],
      (err, results) => {
        if (err) {
          return console.error("ERROR GETTING ADDRESS DATA:", err.message);
        }
        output = results;
        console.log(output);
        // return res;
      }
    ));
    // return output;
  }

  async all() {
    let allDataSQL = `SELECT address amount FROM addresses`;

    return await this.db.all(allDataSQL, (err, results) => {
      if (err) {
        return console.error("ERROR GETTING ALL DATA:", err.message);
      }
      return console.log(results);
    });
  }

  async close() {
    return await this.db.close((err) => {
      if (err) {
        return console.error(`ERROR CLOSING DATABASE:`, err.message);
      }
      console.log("Database closed.");
    });
  }
}

const test = new DB();
test.get("test");
// test.all();
