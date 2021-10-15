import { FormControlLabel, Switch } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import ImageGrid from "./ImageGrid";
import Session from "./Session";
import Timer from "./Timer";

function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  const [numPomodoro, setNumPomodoro] = useState(1);
  const [reveal, setReveal] = useState(
    // [false, false].concat(Array(numPomodoro - 2).fill(false))
    Array(numPomodoro).fill(false)
  );
  const [isDone, setIsDone] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

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
  }, [reveal]);

  const handleChange = (e) => {
    setIsRandom(e.target.checked);
  };

  const onReveal = () => {
    // const [totalReveal, tempReveal] = computeReveal();

    //if reveal still has false, set one to true
    const tempReveal = [...reveal];

    // if (totalReveal !== numPomodoro) {
    //   tempReveal[tempReveal.indexOf(false)] = true;
    // }

    if (tempReveal.indexOf(false) != null) {
      tempReveal[tempReveal.indexOf(false)] = true;
    }

    setReveal(tempReveal);
  };

  const onRandomReveal = () => {
    const prevReveal = [...reveal];

    const unrevealed = prevReveal.reduce((arr, item, i) => {
      if (item === false) {
        arr.push(i);
      }
      return arr;
    }, []);
    console.log(prevReveal);
    console.log("unrevealed", unrevealed);

    const random = Math.floor(Math.random() * unrevealed.length);
    prevReveal[unrevealed[random]] = true;
    setReveal(prevReveal);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1>Goal Name</h1>
      {isDone ? (
        <>
          <h2>
            Progress: {computeReveal()}/{numPomodoro}
          </h2>
          <h2>Congrats</h2>
        </>
      ) : (
        <h2>
          Progress: {computeReveal()}/{numPomodoro}
        </h2>
      )}
      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />

      <FormControlLabel
        control={<Switch checked={isRandom} onChange={handleChange} />}
        label="Random Reveal"
      />

      <button onClick={isRandom ? onRandomReveal : onReveal}>Reveal</button>
      <Session
        numPomodoro={numPomodoro}
        setNumPomodoro={setNumPomodoro}
        isDone={isDone}
        setIsDone={setIsDone}
        reveal={reveal}
        isActive={isActive}
        setReveal={setReveal}
      />
      <Timer
        onReveal={onReveal}
        isActive={isActive}
        setIsActive={setIsActive}
      />

      <button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
        }}
      >
        New Goal
      </button>
    </div>
  );
}

export default Pomodoro;
