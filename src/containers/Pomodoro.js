import { useState, useEffect, useCallback } from "react";
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
  const [numPomodoro, setNumPomodoro] = useState(1); //change to 25
  const [reveal, setReveal] = useState([false]);
  const [isDone, setIsDone] = useState(false);

  const [isRandom, setIsRandom] = useState(false);

  // Timer state
  const [presetMin, setPresetMin] = useState(1);
  const [minutes, setMinutes] = useState(presetMin);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [isSessionDone, setIsSessionDone] = useState(false);

  //Arrow Guide
  const [isGuided, setIsGuided] = useState(false);

  //optimize this function because it renders twice
  const computeReveal = () => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    return [totalReveal, tempReveal];
  };

  useEffect(() => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    if (totalReveal === numPomodoro) {
      setIsDone(true);
    }
  }, [reveal, numPomodoro]);

  const handleToggle = (e) => {
    setIsRandom(e.target.checked);
  };

  const onReveal = useCallback(() => {
    // recommended usecallback because this function is a dependency on timer useeffect, is it necessary though?
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
  }, [reveal, isRandom]);

  useEffect(() => {
    let interval = null;

    let start = new Date();
    start.setSeconds(start.getSeconds() + presetMin * 60 + 1);

    if (isActive) {
      interval = setInterval(() => {
        let current = new Date().getTime();
        let distance = start - current;

        let s = Math.floor((distance % (1000 * 60)) / 1000);
        let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setMinutes(m);
        setSeconds(s);

        if (distance < 0) {
          setIsActive(false);
          onReveal();
          setIsSessionDone(true);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, presetMin, onReveal]); //too many dependencies

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
