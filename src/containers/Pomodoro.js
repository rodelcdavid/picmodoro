import { useState, useEffect, useCallback } from "react";
import Details from "../components/Pomodoro/Details";

import { Box } from "@mui/material";

import ImageGrid from "../components/Pomodoro/ImageGrid";

import SettingsButton from "../components/Pomodoro/SettingsButton";
import NewGoalButton from "../components/Pomodoro/NewGoalButton";
import DisplayTimer from "./DisplayTimer";
import UpArrow from "../components/Pomodoro/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { updateGoalName, updateGoalImage } from "../slices/goal";
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
import { toggleIsDone, updateReveal } from "../slices/displayGrid";

function Pomodoro({ defaultImg, setScreenState }) {
  //Local state
  const [guide, setGuide] = useState(true);

  //Selectors
  //can use spread instead of individual?
  const { goalName, goalImage } = useSelector((state) => state.goalState);
  const { isRandom, presetMin, numPomodoro } = useSelector(
    (state) => state.settingsState
  );
  const { minutes, seconds, isActive, isSessionDone } = useSelector(
    (state) => state.timerState
  );
  const { reveal, isDone } = useSelector((state) => state.displayGridState);

  //Dispatch
  const dispatch = useDispatch();

  const _updateGoalName = (name) => dispatch(updateGoalName(name));
  const _updateGoalImage = (image) => dispatch(updateGoalImage(image));

  const _toggleIsRandom = (checked) => dispatch(toggleIsRandom(checked));
  const _updatePresetMin = (min) => dispatch(updatePresetMin(min));
  const _updateNumPomodoro = (num) => dispatch(updateNumPomodoro(num));

  const _updateMinutes = (min) => dispatch(updateMinutes(min));
  const _updateSeconds = (sec) => dispatch(updateSeconds(sec));
  const _toggleIsActive = (bool) => dispatch(toggleIsActive(bool));
  const _toggleIsSessionDone = (bool) => dispatch(toggleIsSessionDone(bool));

  const _updateReveal = (arr) => dispatch(updateReveal(arr));
  const _toggleIsDone = (bool) => dispatch(toggleIsDone(bool));

  //functions, maybe put these outside?
  //optimize this function because it renders twice
  const computeReveal = () => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;
    return [totalReveal, tempReveal];
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
    _updateReveal(prevReveal);
  }, [reveal, isRandom]);

  //ComponentDidUpdate
  useEffect(() => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    if (totalReveal === numPomodoro) {
      _toggleIsDone(true);
    }
  }, [reveal, numPomodoro]);

  const handleToggle = (e) => {
    _toggleIsRandom(e.target.checked); //can you refactor this to !isRandom?
  };

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

  useEffect(() => {
    const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

    document.title =
      isSessionDone || !isActive
        ? "Picmodoro"
        : `Picmodoro (${timerMinutes}:${timerSeconds})`;
  }, [minutes, seconds, isSessionDone, isActive]);
  return (
    <Box
      sx={{
        textAlign: "center",
        display: "grid",
        gridTemplateRows: "1fr 3fr 1fr",
        alignItems: "center",
        width: ["100%", "450px"],
        margin: "1rem auto",
        // border: "solid 2px rgba(0,0,0,0.23)",
        borderRadius: "10px",
        // boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        boxShadow: 3,
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
          setGoalImg={_updateGoalImage}
          setGoalName={_updateGoalName}
          setIsSessionDone={_toggleIsSessionDone}
          setReveal={_updateReveal}
          defaultImg={defaultImg}
          isActive={isActive}
          setMinutes={_updateMinutes}
          setSeconds={_updateSeconds}
          setNumPomodoro={_updateNumPomodoro}
          setPresetMin={_updatePresetMin}
          setIsRandom={_toggleIsRandom}
          setIsDone={_toggleIsDone}
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
          setIsDone={_toggleIsDone}
          reveal={reveal}
          isActive={isActive}
          setReveal={_updateReveal}
          setIsActive={_toggleIsActive}
          setMinutes={_updateMinutes}
          presetMin={presetMin}
          setPresetMin={_updatePresetMin}
          isSessionDone={isSessionDone}
          setIsSessionDone={_toggleIsSessionDone}
          setGuide={setGuide}
        />
        <UpArrow guide={guide ? 1 : 0} />
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
