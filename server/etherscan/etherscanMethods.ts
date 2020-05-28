import axios from "axios";
import * as promise from "bluebird";
import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const bluePromise = promise.Promise;

const etherscanURL = "https://api.etherscan.io/api?";

function getAddresses(): Promise<string[]> {
  let config: object = {
    method: "get",
    url: etherscanURL,
    params: {
      module: "account",
      action: "tokentx",
      contractaddress: process.env.TOKEN_CONTRACT_ADDRESS,
      address: process.env.TOKEN_HOLDER_ADDRESS,
      sort: "asc",
      apikey: process.env.ETHERSCAN_KEY,
    },
  };

  let uniqueAddressList: [string];
  return new bluePromise((resolve) => {
    const call = axios(config).then((response) => {
      let i;
      for(i=0; i<response.data.result.length; i++) {
        if(!(response.data.result[i].to in uniqueAddressList)) {
          uniqueAddressList.push(response.data.result[i].to)
        }
      }
      resolve(uniqueAddressList)
    });
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

  return new bluePromise((resolve) => {
    let call = axios(config).then((response) => {
      let balance = response.data.result.toString();

      output = parseInt(balance.substring(0, balance.length - 18));
      resolve(output);
    });
  });
}

// export { getAddresses, getBalance };
