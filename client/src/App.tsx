import React, { useState, useEffect } from "react";
import AddressTable from "./components/AddressTable";
import { getAddresses, getBalance } from "./etherscan/etherscanMethods";
import "./App.css";
// import * as dotenv from "dotenv";
// import * as path from "path";

// dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function App() {
  const [addressList, setAddressList] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      let address = await getAddresses().then((res) => {
        return res;
      });
      setAddressList(address);
    })();
  }, []);

  console.log(addressList);
  return (
    <div className="App">
      <AddressTable addressList={addressList}></AddressTable>
    </div>
  );
}

export default App;
