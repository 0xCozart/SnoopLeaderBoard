import React, { useState, useEffect } from "react";
import AddressTable from "./components/AddressTable";
import { Explorer, sites } from "adventure-component-library";
import { CardLink, DbCard } from "./components/Cards";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
      <div className="adventure-logo">
        <img src="/adventure-logo.png" alt="adventure logo" />
      </div>
      <audio src="/GinNJuice.mp3" autoPlay={true} loop={false}></audio>
      <div className="container">
        <CardLink></CardLink>
        <AddressTable addressList={addressList}></AddressTable>
        <DbCard></DbCard>
      </div>
      <img className={"snoop"} src="/snoop-dance.gif" alt="OG" />
      <div className="explorer-bar">
        <Explorer site={sites.GinNJuice} />
      </div>
    </div>
  );
}

export default App;
