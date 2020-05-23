import axios from "axios";
import * as promise from "bluebird";
import * as dotenv from "dotenv";

dotenv.config({ path: "../.env" });
const Promise = promise.Promise;

const etherscanURL = "https://api.etherscan.io/api";

export default function getAddresses() {
  let addressList: any[] = [];
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
        addressList.push(data.to);
      });
      console.log(addressList);
      resolve(addressList);
    });
  });
}
