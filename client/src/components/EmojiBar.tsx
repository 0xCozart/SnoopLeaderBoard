import React, { useState, Props, useRef } from "react";
import { Picker, Emoji, EmojiData } from "emoji-mart";
import { Paper, Button, Chip, Collapse } from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import "./EmojiBar.css";
import { makeStyles, Theme } from "@material-ui/core/styles";

type emojiButtonProps = {
  emojiList: EmojiData[];
  setEmojiList: React.Dispatch<React.SetStateAction<EmojiData[]>>;
};

type emojiBarProps = {
  emojiList: EmojiData[];
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1),
    margin: 0,
    height: 110,
    width: 290,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const StyledButton = makeStyles((theme: Theme) => ({
  root: {
    background: "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)",
    // background: "linear-gradient(50deg, #FE6B8B 30%, #FF8E53 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 35,
    width: 50,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    position: "absolute",
  },
  label: {
    textTransform: "capitalize",
  },
}));

type emojiProps = {
  emojiList: EmojiData[];
  setEmojiList: React.Dispatch<React.SetStateAction<EmojiData[]>>;
};

function EmojiButton(props: emojiProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  const classes = StyledButton();

  return (
    <>
      <div className={"emoji-picker"}>
        {/* {toggle ? ( */}
        <Collapse in={toggle}>
          <Picker
            set="apple"
            theme={"dark"}
            title={"Adventure Corp"}
            onSelect={(emoji) => {
              if (props.emojiList.length >= 18) return;
              props.setEmojiList([...props.emojiList, emoji]);
            }}
          />
        </Collapse>
        {/* ) : null} */}
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

interface emojiDisplayData {
  emoji: EmojiData;
  count: number;
}

type emojiDisplayList = {
  data: emojiDisplayData[];
};

function EmojiBar(props: emojiProps) {
  const classes = useStyles();

  const handleDelete = (chipToDelete: number) => () => {
    props.setEmojiList((chips) =>
      chips.filter((chip) => chips[chipToDelete] !== chips[chips.indexOf(chip)])
    );
  };
  return (
    <Paper component="ul" className={classes.root} elevation={20}>
      {props.emojiList.map((value, index) => {
        // need to add conditional for creating a new table row when emoji count = % 0
        return (
          <Chip
            clickable={true}
            label={
              <Emoji
                key={index.toString()}
                set={"apple"}
                size={21}
                emoji={value}
              />
            }
            onClick={handleDelete(index)}
            className={classes.chip}
          />
        );
      })}
    </Paper>
  );
}

export { EmojiButton, EmojiBar };
// README.md
// import
