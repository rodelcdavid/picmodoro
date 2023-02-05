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
} from "../features/slices/timerSlice";
import { saveSettingsAsync } from "../features/asyncActions/goalAsyncActions";
import { updateBlockers, updateIsDone } from "../features/slices/goalSlice";

const DisplayTimer = ({ currentGoal, goalIdParam }) => {
  const { blockers, is_random: isRandom, preset_min: presetMin } = currentGoal;

  //Selectors
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

  //Simulate reveal
  const handleReveal = () => {
    onReveal();
    dispatch(toggleIsSessionDone(true));
  };

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

        dispatch(updateMinutes(m));
        dispatch(updateSeconds(s));

        if (distance < 0) {
          dispatch(toggleIsActive(false));
          onReveal();
          dispatch(toggleIsSessionDone(true));
        }
      }, 100);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, presetMin, dispatch]);

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

  return (
    <Box>
      {/* <button
        style={{
          position: "absolute",
          top: "50px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
        onClick={handleReveal}
      >
        Reveal
      </button> */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "rgba(0,0,0,0.87)",

          "@media (min-width:580px)": {
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
          size="small"
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
          size="small"
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
          size="small"
        >
          Start timer
        </Button>
      );
    }
  }
};

export default DisplayTimer;
