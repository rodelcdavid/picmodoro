import { useState, useEffect } from "react";
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
  updateBlockers,
  updatePresetMin,
} from "../slices/settings";
import {
  toggleIsActive,
  toggleIsSessionDone,
  updateMinutes,
  updateSeconds,
} from "../slices/timer";
import { toggleIsDone } from "../slices/displayGrid";

function Pomodoro({ defaultImg, setScreenState }) {
  //TODO: Separate these selectors and dispatch to their respective components to minimize rerender!
  //Local state

  const [guide, setGuide] = useState(true);

  //Selectors
  //can use spread instead of individual?
  const { goalName, goalImage } = useSelector((state) => state.goalState);
  const { isRandom, presetMin, blockers } = useSelector(
    (state) => state.settingsState
  );
  const { minutes, seconds, isActive, isSessionDone } = useSelector(
    (state) => state.timerState
  );
  const { isDone } = useSelector((state) => state.displayGridState);

  //Dispatch
  const dispatch = useDispatch();

  const _updateGoalName = (name) => dispatch(updateGoalName(name));
  const _updateGoalImage = (image) => dispatch(updateGoalImage(image));

  const _toggleIsRandom = (checked) => dispatch(toggleIsRandom(checked));
  const _updatePresetMin = (min) => dispatch(updatePresetMin(min));

  const _updateBlockers = (blockers) => dispatch(updateBlockers(blockers));

  const _updateMinutes = (min) => dispatch(updateMinutes(min));
  const _updateSeconds = (sec) => dispatch(updateSeconds(sec));
  const _toggleIsActive = (bool) => dispatch(toggleIsActive(bool));
  const _toggleIsSessionDone = (bool) => dispatch(toggleIsSessionDone(bool));

  // const _updateReveal = (arr) => dispatch(updateReveal(arr));
  const _toggleIsDone = (bool) => dispatch(toggleIsDone(bool));

  //Handlers
  const handleToggle = (e) => {
    _toggleIsRandom(e.target.checked); //can you refactor this to !isRandom?
  };

  //functions, maybe put these outside?

  const onReveal = () => {
    // wrap in useCallback to include in useeffect dependency?
    const reveal = blockers.map((blocker) => blocker.reveal);

    if (isRandom) {
      //Random reveal
      const unrevealed = reveal.reduce((arr, item, i) => {
        if (item === false) {
          arr.push(i);
        }
        return arr;
      }, []);

      const randomIndex = Math.floor(Math.random() * unrevealed.length);

      //Move this to the reducer instead, passthe required index as payload
      //random: unrevealed[randomIndex], normal: reveal.indexOf(false)
      _updateBlockers(
        blockers.map((blocker, i) =>
          i === unrevealed[randomIndex] ? { ...blocker, reveal: true } : blocker
        )
      );
    } else {
      //Normal reveal
      _updateBlockers(
        blockers.map((blocker, i) =>
          i === reveal.indexOf(false) ? { ...blocker, reveal: true } : blocker
        )
      );
    }
  };

  //ComponentDidUpdate

  //Update if isDone
  useEffect(() => {
    const reveal = blockers.map((blocker) => blocker.reveal);
    const totalReveal = reveal.filter((bool) => bool === true).length;
    if (totalReveal === blockers.length) {
      // _toggleIsDone(true);
      dispatch(toggleIsDone(true));
    } else {
      // _toggleIsDone(false);
      dispatch(toggleIsDone(false));
    }

    console.log(blockers);
  }, [blockers, dispatch]);

  //Set display minutes when presetMin settings changes
  useEffect(() => {
    // _updateMinutes(presetMin);
    dispatch(updateMinutes(presetMin));
  }, [presetMin, dispatch]);

  //Countdown timer
  //This should be on the displaytimer component, make states local
  //Thoughts: Component should be as stateless as possible?, Containers VS Presentational?
  //Dependencies: presetMin, isActive, updatemin, updatesec, toggleisactive, onReveal, toggleisSessioinDone
  //This also should be triggered by onClick, not by useEffect
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

        // _updateMinutes(m);
        // _updateSeconds(s);
        dispatch(updateMinutes(m));
        dispatch(updateSeconds(s));

        if (distance < 0) {
          // _toggleIsActive(false);
          dispatch(toggleIsActive(false));
          onReveal();
          dispatch(toggleIsSessionDone(true));
          // _toggleIsSessionDone(true);
        }
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, presetMin, dispatch]); //too many dependencies

  //Set document title to timer
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
        borderRadius: "20px",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        // boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",

          alignItems: "center",
          width: "350px",
          // width: "400px",
          margin: "0 auto",
          position: "relative",
          background:
            "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
          borderRadius: "10px",
          color: "#fff",
          // color: "#1e3c72",
          padding: "15px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
        }}
      >
        <NewGoalButton
          setScreenState={setScreenState}
          setGoalImg={_updateGoalImage}
          setGoalName={_updateGoalName}
          setIsSessionDone={_toggleIsSessionDone}
          // setReveal={_updateReveal}
          defaultImg={defaultImg}
          isActive={isActive}
          setMinutes={_updateMinutes}
          setSeconds={_updateSeconds}
          updateBlockers={_updateBlockers}
          setPresetMin={_updatePresetMin}
          setIsRandom={_toggleIsRandom}
          setIsDone={_toggleIsDone}
        />
        <Details blockers={blockers} goalName={goalName} />

        <SettingsButton
          blockers={blockers}
          updateBlockers={_updateBlockers}
          isRandom={isRandom}
          handleToggle={handleToggle}
          onReveal={onReveal}
          isDone={isDone}
          toggleIsDone={_toggleIsDone}
          // reveal={reveal}
          isActive={isActive}
          // setReveal={_updateReveal}
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
        blockers={blockers}
        // reveal={reveal}
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
