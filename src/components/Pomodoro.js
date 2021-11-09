import { Button, FormControlLabel, Switch } from "@mui/material";
import { useState, useEffect } from "react";

import ImageGrid from "./ImageGrid";
import Session from "./Session";
import Timer from "./Timer";

function Pomodoro({
  goalImg,
  goalName,
  defaultImg,
  setGoalImg,
  setGoalName,
  setScreenState,
}) {
  const [numPomodoro, setNumPomodoro] = useState(1);
  const [reveal, setReveal] = useState([false]);
  const [isDone, setIsDone] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  //optimize this function because it renders twice
  const computeReveal = () => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    return [totalReveal, tempReveal];
  };

  useEffect(() => {
    console.log("reveal", reveal);
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    if (totalReveal === numPomodoro) {
      setIsDone(true);
    }
  }, [reveal, numPomodoro]);

  const handleToggle = (e) => {
    setIsRandom(e.target.checked);
  };

  const onReveal = () => {
    const prevReveal = [...reveal];

    if (isRandom) {
      //Random reveal
      const unrevealed = prevReveal.reduce((arr, item, i) => {
        if (item === false) {
          arr.push(i);
        }
        return arr;
      }, []);

      const random = Math.floor(Math.random() * unrevealed.length);
      prevReveal[unrevealed[random]] = true;
    } else {
      //Normal reveal
      if (prevReveal.indexOf(false) != null) {
        prevReveal[prevReveal.indexOf(false)] = true;
      }
    }
    setReveal(prevReveal);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>{goalName}</h1>

      {/* should grab totalReveal instead of calling computereveal */}
      <h2>
        Progress: {computeReveal()}/{numPomodoro}
      </h2>

      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />

      {/* {isDone ? <h2>Congratulations</h2> : <h2>Hi</h2>} */}
      <FormControlLabel
        control={<Switch checked={isRandom} onChange={handleToggle} />}
        label="Random Reveal"
      />

      <Button onClick={onReveal} variant="contained">
        Reveal
      </Button>

      <Session
        numPomodoro={numPomodoro}
        setNumPomodoro={setNumPomodoro}
        isDone={isDone}
        setIsDone={setIsDone}
        reveal={reveal}
        isActive={isActive}
        setReveal={setReveal}
      />
      {/* Timer is being rerendered after adding numPomodoro, maybe because of the conditional rendering isActive */}
      <Timer
        onReveal={onReveal}
        isActive={isActive}
        setIsActive={setIsActive}
        isDone={isDone}
      />
      <Button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
          setGoalName("");
        }}
        variant="contained"
        color="success"
      >
        New Goal
      </Button>
    </div>
  );
}

export default Pomodoro;
