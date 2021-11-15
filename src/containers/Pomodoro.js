import { useState, useEffect } from "react";
import Details from "../components/Pomodoro/Details";

import { Box } from "@mui/material";

import ImageGrid from "../components/Pomodoro/ImageGrid";

import SettingsButton from "../components/Pomodoro/SettingsButton";
import NewGoalButton from "../components/Pomodoro/NewGoalButton";
import DisplayTimer from "./DisplayTimer";
import UpArrow from "../components/Pomodoro/UpArrow";

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

  const [isRandom, setIsRandom] = useState(false);

  // Timer state
  const [presetMin, setPresetMin] = useState(5);
  const [minutes, setMinutes] = useState(presetMin);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [isSessionDone, setIsSessionDone] = useState(false);

  const [isGuided, setIsGuided] = useState(false);

  //optimize this function because it renders twice
  const computeReveal = () => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    return [totalReveal, tempReveal];
  };

  useEffect(() => {
    // console.log("reveal", reveal);
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
    //when timer hits zero, new class should be added on a random tile
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
    <Box
      sx={{
        textAlign: "center",
        display: "grid",
        gridTemplateRows: "1fr 3fr 1fr",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          width: "350px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <NewGoalButton
          setScreenState={setScreenState}
          setGoalImg={setGoalImg}
          setGoalName={setGoalName}
          defaultImg={defaultImg}
          isActive={isActive}
        />
        <Details
          goalName={goalName}
          computeReveal={computeReveal}
          numPomodoro={numPomodoro}
        />

        <SettingsButton
          isRandom={isRandom}
          handleToggle={handleToggle}
          onReveal={onReveal}
          numPomodoro={numPomodoro}
          setNumPomodoro={setNumPomodoro}
          isDone={isDone}
          setIsDone={setIsDone}
          reveal={reveal}
          isActive={isActive}
          setReveal={setReveal}
          setIsActive={setIsActive}
          setMinutes={setMinutes}
          presetMin={presetMin}
          setPresetMin={setPresetMin}
          isSessionDone={isSessionDone}
          setIsSessionDone={setIsSessionDone}
          setIsGuided={setIsGuided}
        />
        <UpArrow isGuided={isGuided} />
      </Box>

      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />
      <DisplayTimer
        presetMin={presetMin}
        isActive={isActive}
        setIsActive={setIsActive}
        isDone={isDone}
        onReveal={onReveal}
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
        isSessionDone={isSessionDone}
        setIsSessionDone={setIsSessionDone}
      />
    </Box>
  );
}

export default Pomodoro;
