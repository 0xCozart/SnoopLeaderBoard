import express from "express";
import path from "path";
import { getAddresses } from "./etherscan/etherscanMethods";

const port = process.env.port || 5000;
const app = express();

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/address-list", (request, response) => {
  getAddresses().then((res) => {
    response.json(res);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
