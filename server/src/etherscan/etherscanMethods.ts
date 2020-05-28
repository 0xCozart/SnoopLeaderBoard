import axios from "axios";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "../..", ".env") });

const etherscanURL = "https://api.etherscan.io/api?";

function getAddresses(
  contractAddress: string,
  address: string,
  apikey: string
): Promise<string[]> {
  let config: object = {
    method: "get",
    url: etherscanURL,
    params: {
      module: "account",
      action: "tokentx",
      contractaddress: contractAddress,
      address: address,
      sort: "asc",
      apikey: apikey,
    },
  };

  return new Promise((resolve) => {
    let uniqueAddressList: string[] = [];
    axios(config).then((response) => {
      for (let i = 0; i < response.data.result.length; i++) {
        if (!uniqueAddressList.includes(response.data.result[i].to)) {
          uniqueAddressList.push(response.data.result[i].to);
        }
      }
      console.log(uniqueAddressList);
      resolve(uniqueAddressList);
    });
  });
}

function getBalance(address: string): Promise<number> {
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
    let call = axios(config).then((response) => {
      let balance = response.data.result.toString();

      output = parseInt(balance.substring(0, balance.length - 18));
      resolve(output);
    });
  });
}

export { getAddresses, getBalance };
