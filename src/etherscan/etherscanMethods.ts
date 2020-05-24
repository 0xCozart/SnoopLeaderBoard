import axios from "axios";
import * as promise from "bluebird";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const Promise = promise.Promise;

const etherscanURL = "https://api.etherscan.io/api";

function getAddresses() {
  let holdersAddresses: string[] = [];
  let config: object = {
    method: "get",
    url: etherscanURL,
    params: {
      module: "account",
      action: "tokentx",
      address: process.env.TOKEN_HOLDER_ADDRESS,
      startBlock: "379224",
      endBlock: "latest",
      apikey: process.env.ETHERSCAN_KEY,
    },
  };

  return new Promise((resolve) => {
    axios(config).then((response) => {
      response.data.result.map((data: any, index: number) => {
        // appends recipient to holders list
        holdersAddresses.push(data.to);
      });
      // console.log(addressList);
      resolve(holdersAddresses);
    });
  });
}

function getBalance(address: string) {
  let output: number;
  let config: object = {
    method: "get",
    url: etherscanURL,
    params: {
      module: "account",
      action: "tokenbalance",
      contractaddress: process.env.TOKEN_CONTRACT_ADDRESS,
      address: address,
      tag: "latest",
      apikey: process.env.ETHERSCAN_KEY,
    },
  };

  return new Promise((resolve) => {
    axios(config).then((response) => {
      let balance = response.data.result.toString();

      output = parseInt(balance.substring(0, balance.length - 18));
      console.log(output);
      // console.log(response);
      resolve(response);
    });
  });
}

export { getAddresses, getBalance };
