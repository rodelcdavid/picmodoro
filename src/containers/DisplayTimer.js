import { Button } from "@mui/material";
import React, { useEffect } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box } from "@mui/system";

const DisplayTimer = ({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  presetMin,
  isDone,
  isActive,
  setIsActive,
  onReveal,
  isSessionDone,
  setIsSessionDone,
}) => {
  useEffect(() => {
    setMinutes(presetMin);
  }, [presetMin, setMinutes]);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes !== 0) {
            setSeconds(59);
            setMinutes(minutes - 1);
          } else {
            setIsActive(false);
            setIsSessionDone(true);
            onReveal();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    seconds,
    minutes,
    isActive,
    onReveal,
    setIsActive,
    setMinutes,
    setSeconds,
    setIsSessionDone,
  ]); // too many dependencies

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //if timer is active, discard
  //if timer is not active && issessiondone, reset
  //if timer is not active && isDone congrats
  //if timer is not active, start

  return (
    <div>
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
          <CheckIcon color="success" fontSize="medium" /> Session finished.
        </Box>
      )}

      <TimerControls
        isActive={isActive}
        isSessionDone={isSessionDone}
        setIsSessionDone={setIsSessionDone}
        isDone={isDone}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setIsActive={setIsActive}
        presetMin={presetMin}
      />

      {/* <Button
        disabled={isDone ? true : false}
        style={{ display: "block", margin: "0 auto" }}
        onClick={() => {
          setMinutes(presetMin);
          setSeconds(0);
          setIsSessionDone(false);
        }}
        variant="contained"
        color="warning"
      >
        Reset Timer
      </Button>

      {isActive ? (
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
      ) : (
        <Button
          style={{
            display: isDone || isSessionDone ? "none" : "block",
            margin: "0 auto",
          }}
          onClick={() => setIsActive(true)}
          variant="contained"
          color="primary"
        >
          Start timer
        </Button>
      )} */}
    </div>
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
      return <h3 style={{ color: "green" }}>All Done. Congratulations!</h3>;
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
