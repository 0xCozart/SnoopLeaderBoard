import Web3 from "web3";
import * as promise from "bluebird";
import * as dotenv from "dotenv";
dotenv.config({ path: "../.env" });

const Promise = promise.Promise;

const web3 = new Web3(Web3.givenProvider || "localhost:3000");

let ABI: any = [
  // ABI for balanceOf function for contract
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  // ABI for attaining decimals for
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];
// Creates contract object for ERC20
let contract: any = new web3.eth.Contract(ABI, process.env.TOKEN_OWNER_ADDRESS);

// function to grab amount of tokens from address
const getBalance = (userAddress: string): Promise<number> => {
  return new Promise<number>((resolve) => {
    contract.balanceOf(userAddress, (error: Error, balance: any) => {
      // Get token decimals
      contract.decimals((error: object, decimal: number) => {
        // calculate human readable balance
        let output = balance.div(10 ** decimal);
        // let output = balance.toString();
        resolve(output);
      });
    });
  });
};

export default getBalance;
