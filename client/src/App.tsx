import React, { useState, useEffect } from "react";
import AddressTable from "./components/AddressTable";
import { Explorer, sites } from "adventure-component-library";
import CardLink from "./components/CardLink";
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
      <div className="board">
        <AddressTable addressList={addressList}></AddressTable>
      </div>
      <div className="link-card">
        <CardLink></CardLink>
      </div>
      {/* <div>
        <img className={"snoop"} src="/snoop-dance.gif" alt="OG" />
      </div> */}
      <div className="explorer-bar">
        <Explorer site={sites.leaderboard} />
      </div>
    </div>
  );
}

export default App;
