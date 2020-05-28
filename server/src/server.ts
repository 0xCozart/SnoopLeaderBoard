const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { getAddresses } = require("./etherscan/etherscanMethods");

dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

const port = process.env.port || 5000;
const app = express();

app.use(bodyParser.json());

app.get("/address-list", (request, response) => {
  // console.log("GET REQ address-list");
  let list = getAddresses(
    process.env.TOKEN_CONTRACT_ADDRESS,
    process.env.TOKEN_HOLDER_ADDRESS,
    process.env.ETHERSCAN_KEY
  ).then((res) => {
    response.send({ res });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
