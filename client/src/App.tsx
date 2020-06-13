import React, { useState, useEffect } from "react";
import AddressTable from "./components/AddressTable";
import { Explorer, sites } from "adventure-component-library";
import { CardLink, DbCard } from "./components/Cards";
import { EmojiButton, EmojiBar } from "./components/EmojiBar";
import { EmojiData } from "emoji-mart";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

interface emojiDisplayData {
  [emoji: string]: {
    data: EmojiData;
    count: number;
  };
}

function App() {
  const [addressList, setAddressList] = useState<string[]>([]);
  const [emotes, setEmotes] = useState<emojiDisplayData>({});

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
      {/* <audio src="/GinNJuice.mp3" autoPlay={true} loop={false}></audio> */}
      <div className="container"></div>
      {/* <CardLink></CardLink> */}
      {/* <AddressTable addressList={addressList}></AddressTable> */}
      {/* <DbCard></DbCard> */}
      <div className={"bar2"}>
        <EmojiBar
          setEmojiData={setEmotes}
          emojiData={emotes}
          theme={"adventure"}
        />
      </div>
      <div className={"but"}>
        <EmojiButton
          emojiData={emotes}
          setEmojiData={setEmotes}
          theme={"adventure"}
          limit={500}
        />
      </div>

      {/* <img className="snoop" src="/snoop-dance.gif" alt="OG" /> */}
      <div className="explorer-bar">
        {/* <Explorer site={sites.ginandjuice} /> */}
      </div>
    </div>
  );
}

export default App;
