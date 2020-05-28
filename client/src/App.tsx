import React, { useState, useEffect } from "react";
import AddressTable from "./components/AddressTable";
import "./App.css";
// import * as dotenv from "dotenv";
// import * as path from "path";

// dotenv.config({ path: path.resolve(__dirname, "..", ".env") });

function App() {
  const [addressList, setAddressList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/address-list")
      .then((res) => {
        const list = res.json();
        return list;
      })
      .then((res) => {
        console.log(res.res);
        setAddressList(res.res);
      });
  }, []);

  return (
    <div className="App">
      <AddressTable addressList={addressList}></AddressTable>
    </div>
  );
}

export default App;
