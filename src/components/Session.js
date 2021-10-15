import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

export default function Session({
  numPomodoro,
  setNumPomodoro,
  reveal,
  isDone,
  setIsDone,
  isActive,
  setReveal,
}) {
  const onPlus = () => {
    //Add 1 to numPomodoro
    const tempNum = numPomodoro + 1;
    setNumPomodoro(tempNum);

    //add false to reveal array
    let tempReveal = [...reveal];

    tempReveal.push(false);

    setReveal(tempReveal);
    // console.log("tempreveal", tempReveal);

    const totalReveal = tempReveal.filter((x) => x === true).length;
    console.log("plusreveal", totalReveal, tempNum);
    if (totalReveal >= tempNum) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const onMinus = () => {
    if (numPomodoro === 1) {
      return;
    } else {
      //subtract 1 to numPomodoro
      const tempNum = numPomodoro - 1;
      setNumPomodoro(tempNum);

      //remove last false
      //what if last element is true?
      let tempReveal = [...reveal];
      console.log("lastindex", tempReveal.lastIndexOf(false));

      if (tempReveal[tempReveal.length - 1] === true) {
        // tempReveal.reduce((arr, item, i) => {
        //   if (item === false) {
        //     arr.push(i);
        //   }
        //   return arr;
        // }, []);
        tempReveal.splice(tempReveal.lastIndexOf(false), 1);
      } else {
        tempReveal.pop();
      }
      console.log("tempReveal on splice", tempReveal);

      setReveal(tempReveal);
      console.log("reveal on minus", reveal);

      const totalReveal = tempReveal.filter((x) => x === true).length;
      console.log("plusreveal", totalReveal, tempNum);
      if (totalReveal >= tempNum) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    }
  };
  return (
    <div>
      <h3>How many Pomodoro sessions to finish this goal?</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          color="primary"
          disabled={isDone || numPomodoro === 1 || isActive ? true : false}
          onClick={onMinus}
        >
          <KeyboardArrowDown />
        </IconButton>

        <p style={{ margin: "0 5px" }}>{numPomodoro}</p>
        <IconButton
          color="primary"
          disabled={isActive ? true : false}
          onClick={onPlus}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>
    </div>
  );
}
