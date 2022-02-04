import { Button } from "@mui/material";
import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import {
  resetTimerState,
  toggleIsActive,
  toggleIsSessionDone,
  updateMinutes,
  updateSeconds,
} from "../features/timerSlice";

import {
  saveSettingsAsync,
  updateBlockers,
  updateIsDone,
} from "../features/goalSlice";

const DisplayTimer = ({ currentGoal, goalIdParam }) => {
  console.log("DisplayTimer.js");

  const { blockers, is_random: isRandom, preset_min: presetMin } = currentGoal;
  //Local state

  //Selectors
  //TODO: Reset these when changing to different goal
  const { minutes, seconds, isActive, isSessionDone } = useSelector(
    (state) => state.timerState
  );

  const { isDone } = useSelector((state) => state.displayGridState);

  //Dispatch
  const dispatch = useDispatch();
  const _updateMinutes = (min) => dispatch(updateMinutes(min));
  const _updateSeconds = (sec) => dispatch(updateSeconds(sec));
  const _toggleIsActive = (bool) => dispatch(toggleIsActive(bool));
  const _toggleIsSessionDone = (bool) => dispatch(toggleIsSessionDone(bool));
  const _updateBlockers = (payload) => dispatch(updateBlockers(payload));
  const _updateIsDone = (payload) => dispatch(updateIsDone(payload));

  //Handlers

  //Simulate reveal TODO:To be deleted
  const handleReveal = () => {
    // dispatch(updateMinutes(0));
    // dispatch(updateSeconds(5));
    onReveal();
    dispatch(toggleIsSessionDone(true));
  };
  // wrap in useCallback to include in useeffect dependency?
  //can i move this out of this component?
  const onReveal = () => {
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
      _updateBlockers({
        id: goalIdParam,
        blockers: blockers.map((blocker, i) =>
          i === unrevealed[randomIndex] ? { ...blocker, reveal: true } : blocker
        ),
      });
    } else {
      //Normal reveal
      _updateBlockers({
        id: goalIdParam,
        blockers: blockers.map((blocker, i) =>
          i === reveal.indexOf(false) ? { ...blocker, reveal: true } : blocker
        ),
      });
    }
  };

  //Vars
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  useEffect(() => {
    document.title =
      isSessionDone || !isActive
        ? "Picmodoro"
        : `Picmodoro (${timerMinutes}:${timerSeconds})`;
  }, [timerMinutes, timerSeconds, isSessionDone, isActive]);

  //Countdown Timer -> This also should be triggered by onClick, not by useEffect
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

  //Save to database when session ended
  useEffect(() => {
    dispatch(
      saveSettingsAsync({ currentGoal: currentGoal, id: currentGoal.id })
    );
  }, [isSessionDone, isDone]);

  //Save to database when all are revealed (isdone)
  useEffect(() => {
    dispatch(
      _updateIsDone({
        id: goalIdParam,
        isDone: isDone,
      })
    );
  }, [isDone]);

  //Reset on component did mount
  useEffect(() => {
    dispatch(resetTimerState());
    _updateMinutes(presetMin);
  }, [dispatch]);
  //if timer is active, discard
  //if timer is not active && issessiondone, reset
  //if timer is not active && isDone congrats
  //if timer is not active, start

  return (
    <Box>
      <button
        style={{
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={handleReveal}
      >
        Reveal
      </button>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50px",
          color: "#1e3c72",
          // backgroundColor: "#2a5298",
          // width: "140px",
          // height: "140px",
          // borderRadius: "100%",
          // padding: "2rem",

          "@media (min-width:768px)": {
            "& > h1": {
              fontSize: "3rem",
            },
          },
        }}
      >
        {!isSessionDone ? (
          <h1>
            {timerMinutes}:{timerSeconds}
          </h1>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bolder",
            }}
          >
            Session finished{" "}
            <CheckCircleIcon
              sx={{ marginLeft: "5px" }}
              color="success"
              fontSize="small"
            />
          </Box>
        )}
      </Box>

      <TimerControls
        isActive={isActive}
        isSessionDone={isSessionDone}
        setIsSessionDone={_toggleIsSessionDone}
        isDone={isDone}
        setMinutes={_updateMinutes}
        setSeconds={_updateSeconds}
        setIsActive={_toggleIsActive}
        presetMin={presetMin}
      />
    </Box>
  );
};

const TimerControls = ({
  isActive,
  isSessionDone,
  setIsSessionDone,
  isDone,
  setMinutes,
  setSeconds,
  setIsActive,
  presetMin,
}) => {
  if (isActive) {
    return (
      <>
        <Button
          onClick={() => {
            setMinutes(presetMin);
            setSeconds(0);
            setIsActive(false);
          }}
          variant="contained"
          color="error"
        >
          Discard session
        </Button>
      </>
    );
  } else {
    if (isSessionDone && !isDone) {
      return (
        <Button
          disabled={isDone ? true : false}
          style={{ display: "block", margin: "0 auto" }}
          onClick={() => {
            setMinutes(presetMin);
            setSeconds(0);
            setIsSessionDone(false);
          }}
          variant="contained"
          color="success"
        >
          New Session
        </Button>
      );
    }

    if (isDone) {
      return (
        <>
          <h3 style={{ color: "green" }}>All Done. Congratulations!</h3>
          <p style={{ fontSize: "0.8rem" }}>
            (You can always add more sessions to this goal.)
          </p>
        </>
      );
    }

    if (!isDone && !isSessionDone) {
      return (
        <Button
          style={{
            display: isDone || isSessionDone ? "none" : "inline-block",
          }}
          onClick={() => setIsActive(true)}
          variant="contained"
          color="primary"
        >
          Start timer
        </Button>
      );
    }
  }
};

export default DisplayTimer;
