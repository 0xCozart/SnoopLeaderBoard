import React, { useState } from "react";
import { Picker, Emoji, EmojiData } from "emoji-mart";
import { makeStyles, Theme } from "@material-ui/core/styles";
// import { emojiBarProps, emojiButtonProps } from "../types/emojiTypes";
import {
  Paper,
  Button,
  Chip,
  Collapse,
  Grid,
  Container,
} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import "./EmojiBar.css";
export interface emojiDisplayData {
  [emoji: string]: {
    data: EmojiData;
    count: number;
  };
}

export type emojiButtonProps = {
  emojiData: emojiDisplayData;
  setEmojiData: React.Dispatch<React.SetStateAction<emojiDisplayData>>;
  theme: string;
  limit?: number;
};

export type emojiBarProps = {
  emojiData: emojiDisplayData;
  setEmojiData: React.Dispatch<React.SetStateAction<emojiDisplayData>>;
  theme: string;
};

export function EmojiButton(props: emojiButtonProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  let limit: number = props.limit ? props.limit : 24;

  const ticker = (emoji: EmojiData) => {
    if (!Object.keys(props.emojiData).includes(emoji.name)) {
      props.setEmojiData({
        ...props.emojiData,
        [emoji.name]: { data: emoji, count: 1 },
      });
    } else {
      props.setEmojiData({
        ...props.emojiData,
        [emoji.name]: {
          data: emoji,
          count: props.emojiData[emoji.name].count + 1,
        },
      });
    }
  };

  let bg: string;
  let boxShadow: string;
  if (props.theme === "adventure") {
    bg = "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)";
    boxShadow = "0 3px 5px 2px rgba(255, 105, 135, .3)";
  } else if (props.theme === "default") {
    bg = "white";
    boxShadow = "none";
  } else {
    console.log("Theme needs to be = 'adventure' | 'default'");
  }

  const StyledButton = makeStyles((theme: Theme) => ({
    root: {
      background: bg,
      borderRadius: 3,
      border: 0,
      color: "white",
      height: 35,
      width: 90,
      padding: "0 30px",
      boxShadow: boxShadow,
      position: "absolute",
    },
  }));

  const classes = StyledButton();

  return (
    <>
      <div className={"emoji-picker"}>
        <Collapse in={toggle}>
          <Picker
            set="apple"
            theme={"dark"}
            title={"adventure corp"}
            onSelect={(emoji) => {
              if (Object.keys(props.emojiData).length >= limit) return;
              ticker(emoji);
            }}
          />
        </Collapse>
      </div>
      <Button
        className={classes.root}
        variant="contained"
        onClick={() => setToggle(!toggle)}
      >
        <Emoji emoji="smile" set="apple" size={24} />
      </Button>
    </>
  );
}

function EmojiBar(props: emojiBarProps) {
  const displayedEmojis = Object.values(props.emojiData);
  // Need to change to enum, hard coding this in unseeminly
  let bg: string;
  if (props.theme === "adventure") {
    bg = "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)";
  } else if (props.theme === "default") {
    bg = "white";
  } else {
    console.log("Theme needs to be = 'adventure' | 'default'");
  }

  const useStyles = makeStyles((theme: Theme) => ({
    root: {
      background: bg,
      display: "list-item",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(1),
      margin: 0,
    },
  }));

  const classes = useStyles();

  const ticker = (emoji: EmojiData) => {
    if (!Object.keys(props.emojiData).includes(emoji.name)) {
      props.setEmojiData({
        ...props.emojiData,
        [emoji.name]: { data: emoji, count: 1 },
      });
    } else {
      props.setEmojiData({
        ...props.emojiData,
        [emoji.name]: {
          data: emoji,
          count: props.emojiData[emoji.name].count + 1,
        },
      });
    }
  };

  const deleteChip = (emoji: EmojiData) => {
    let newObj: emojiDisplayData = {};
    Object.assign(newObj, props.emojiData);
    if (newObj) delete newObj[emoji.name];
    return props.setEmojiData(newObj);
  };

  return (
    <Container fixed>
      <Collapse in={Object.keys(props.emojiData).length > 0}>
        <Paper className={classes.root} elevation={24}>
          <Grid container spacing={1}>
            {displayedEmojis.map((value, index) => {
              return (
                <Grid item xs={"auto"} key={index}>
                  <Chip
                    avatar={
                      <Emoji set={"apple"} size={24} emoji={value.data} />
                    }
                    label={"+" + value.count}
                    onClick={() => ticker(value.data)}
                    onDelete={() => deleteChip(value.data)}
                    variant="outlined"
                    size="medium"
                  />
                </Grid>
              );
            })}
          </Grid>
        </Paper>
      </Collapse>
    </Container>
  );
}

function EmojiComponent() {
  const [emotes, setEmotes] = useState<emojiDisplayData>({});
  const [currentBar, setCurrentBar] = useState<number>()

  // picker renders when emoji button attatched to bar is pressed
  // --> setCurrentBar(# of the currently selected bar) picker sends emoji's to activated bar 
  //
  const 

  return (

  )
}


function EmojiComponent(props) {
  const [emojiData, setEmojiData] = useState({})

  const EmojiBar = (props) => {
    ....
  }

  const 

}

Component hierarchy:
1. Emoji Wrapper
  2. EmojiButton
  2. EmojiBar