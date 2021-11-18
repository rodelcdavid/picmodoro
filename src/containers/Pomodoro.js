import { useState, useEffect, useCallback } from "react";
import Details from "../components/Pomodoro/Details";

import { Box } from "@mui/material";

import ImageGrid from "../components/Pomodoro/ImageGrid";

import SettingsButton from "../components/Pomodoro/SettingsButton";
import NewGoalButton from "../components/Pomodoro/NewGoalButton";
import DisplayTimer from "./DisplayTimer";
import UpArrow from "../components/Pomodoro/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { updateName, updateImage } from "../slices/goal";
import {
  toggleIsRandom,
  updateNumPomodoro,
  updatePresetMin,
} from "../slices/settings";
import {
  toggleIsActive,
  toggleIsSessionDone,
  updateMinutes,
  updateSeconds,
} from "../slices/timer";

function Pomodoro({ defaultImg, setScreenState }) {
  // const [numPomodoro, setNumPomodoro] = useState(1); //change to 25
  const [reveal, setReveal] = useState([false]);
  const [isDone, setIsDone] = useState(false);

  // const [isRandom, _toggleIsRandom] = useState(false);

  // Timer state
  // const [presetMin, setPresetMin] = useState(1);

  // const [seconds, setSeconds] = useState(0);
  // const [isActive, setIsActive] = useState(false);

  // const [isSessionDone, setIsSessionDone] = useState(false);

  //Arrow Guide, why the error
  const [isGuided, setIsGuided] = useState(false);

  //Selectors
  //can use spread instead of individual?
  const goalName = useSelector((state) => state.goalState.name);
  const goalImage = useSelector((state) => state.goalState.image);

  const isRandom = useSelector((state) => state.settingsState.isRandom);
  const presetMin = useSelector((state) => state.settingsState.presetMin);
  const numPomodoro = useSelector((state) => state.settingsState.numPomodoro);

  const minutes = useSelector((state) => state.timerState.minutes);
  const seconds = useSelector((state) => state.timerState.seconds);
  const isActive = useSelector((state) => state.timerState.isActive);
  const isSessionDone = useSelector((state) => state.timerState.isSessionDone);

  //Dispatch
  const dispatch = useDispatch();

  const _updateName = (name) => dispatch(updateName(name));
  const _updateImage = (image) => dispatch(updateImage(image));

  const _toggleIsRandom = (checked) => dispatch(toggleIsRandom(checked));
  const _updatePresetMin = (min) => dispatch(updatePresetMin(min));
  const _updateNumPomodoro = (num) => dispatch(updateNumPomodoro(num));

  const _updateMinutes = (min) => dispatch(updateMinutes(min));
  const _updateSeconds = (sec) => dispatch(updateSeconds(sec));
  const _toggleIsActive = (bool) => dispatch(toggleIsActive(bool));
  const _toggleIsSessionDone = (bool) => dispatch(toggleIsSessionDone(bool));

  // const [minutes, setMinutes] = useState(presetMin);

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
    _toggleIsRandom(e.target.checked); //can you refactor this to !isRandom?
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
    _updateMinutes(presetMin);
  }, [presetMin]);

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

        _updateMinutes(m);
        _updateSeconds(s);

        if (distance < 0) {
          _toggleIsActive(false);
          onReveal();
          _toggleIsSessionDone(true);
        }
      }, 100);
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
          setGoalImg={_updateImage}
          setGoalName={_updateName}
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
          setNumPomodoro={_updateNumPomodoro}
          isDone={isDone}
          setIsDone={setIsDone}
          reveal={reveal}
          isActive={isActive}
          setReveal={setReveal}
          setIsActive={_toggleIsActive}
          setMinutes={_updateMinutes}
          presetMin={presetMin}
          setPresetMin={_updatePresetMin}
          isSessionDone={isSessionDone}
          setIsSessionDone={_toggleIsSessionDone}
          setIsGuided={setIsGuided}
        />
        {/* <UpArrow isGuided={isGuided} /> */}
      </Box>

      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImage={goalImage}
      />
      <DisplayTimer
        presetMin={presetMin}
        isActive={isActive}
        setIsActive={_toggleIsActive}
        isDone={isDone}
        onReveal={onReveal}
        minutes={minutes}
        setMinutes={_updateMinutes}
        seconds={seconds}
        setSeconds={_updateSeconds}
        isSessionDone={isSessionDone}
        setIsSessionDone={_toggleIsSessionDone}
      />
    </Box>
  );
}

export default Pomodoro;
