import React, { useState, Props, useRef } from "react";
import { Picker, Emoji, EmojiData } from "emoji-mart";
import {
  Paper,
  Button,
  Chip,
  Collapse,
  Grid,
  ButtonBase,
  Container,
  Avatar,
} from "@material-ui/core";
import "emoji-mart/css/emoji-mart.css";
import "./EmojiBar.css";
import { makeStyles, Theme, recomposeColor } from "@material-ui/core/styles";

type emojiButtonProps = {
  emojiList: EmojiData[];
  setEmojiList: React.Dispatch<React.SetStateAction<EmojiData[]>>;
};

// enum styles {
//   default = "default",
//   adventure = "adventure",
// }

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

interface emojiProps {
  emojiList: EmojiData[];
  setEmojiList: React.Dispatch<React.SetStateAction<EmojiData[]>>;
  theme: string;
  limit?: number;
}

function EmojiButton(props: emojiProps) {
  const [toggle, setToggle] = useState<boolean>(false);
  console.log(props.limit);
  // Sets Emoji limit
  let limit: number = props.limit ? props.limit : 24;
  let bg: string;
  if (props.theme === "adventure") {
    bg = "linear-gradient( 135deg, #43CBFF 10%, #9708CC 100%)";
  } else if (props.theme === "default") {
    bg = "white";
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
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      position: "absolute",
    },
  }));
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
              if (props.emojiList.length >= limit) return;
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
  [emoji: string]: number;
}

const example = {
  smile: 2,
  sad: 12,
};

type emojiDisplayList = {
  data: emojiDisplayData[];
};

function EmojiBar(props: emojiProps) {
  const [showBar, setShowBar] = useState<boolean>();
  const [emojiCount, setEmojiCount] = useState<emojiDisplayData>({});

  let count: number = 1;
  if (!(value.name in Object.keys(emojiCount))) {
    // console.log(value.name);
    setEmojiCount({
      ...emojiCount,
      [props.emojiList[index].name]: count,
    });
  }

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

  const handleDelete = (chipToDelete: number) => () => {
    props.setEmojiList((chips) =>
      chips.filter((chip) => chips[chipToDelete] !== chips[chips.indexOf(chip)])
    );
  };

  // const uptick = (emojiName: string) => () => {
  //   const emoteChip = Document.getElementById(emojiName) as OverridableComponent<GridTypeMap<{}, "div">>
  // }
  const [count, setCount] = useState<number>(1);

  return (
    <Container fixed>
      <Collapse in={props.emojiList.length > 0}>
        <Paper className={classes.root} elevation={24}>
          <Grid container spacing={1}>
            {props.emojiList.map((value, index) => {
              // need to add conditional for creating a new table row when emoji count = % 0

              let ticker = (emojiName: string) => {
                let currentTicker = emojiCount[emojiName];
                setEmojiCount({ emojiName: currentTicker + 1 });
                console.log(emojiCount);
              };

              return (
                <Grid item xs={"auto"} key={index} id={value.name}>
                  <Chip
                    avatar={
                      // <Avatar variant={"circle"}>
                      <Emoji
                        key={index}
                        set={"apple"}
                        size={24}
                        emoji={value}
                      />
                    }
                    label={"+" + emojiCount[value.name]}
                    onClick={() => ticker(value.name)}
                    onDelete={handleDelete(index)}
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
    // <Container fixed>
    //   <Collapse in={props.emojiList.length > 0}>
    //     <Paper className={classes.root} elevation={24}>
    //       <Grid container spacing={1}>
    //         {props.emojiList.map((value, index) => {
    //           // need to add conditional for creating a new table row when emoji count = % 0
    //           return (
    //             <Grid item xs={"auto"} key={index} id={value.name}>
    //               <ButtonBase onClick={handleDelete(index)}>
    //                 <Emoji key={index} set={"apple"} size={24} emoji={value} />
    //                 {"+" + count}
    //               </ButtonBase>
    //             </Grid>
    //           );
    //         })}
    //       </Grid>
    //     </Paper>
    //   </Collapse>
    // </Container>
  );
}

export { EmojiButton, EmojiBar };
// README.md
// import
