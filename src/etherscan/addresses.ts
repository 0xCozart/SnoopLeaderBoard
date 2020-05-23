import axios from "axios";
import * as promise from "bluebird";
import dotenv from "dotenv";
import DAO from "../daos/sqlite";

dotenv.config({ path: "../.env" });
const Promise = promise.Promise;

export default function getAddresses() {
  let addressList: [] = [];

  return new Promise((resolve, reject) => {});
}
