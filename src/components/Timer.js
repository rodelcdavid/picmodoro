import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";

function Timer({ onReveal, isActive, setIsActive, isDone }) {
  const [presetMin, setPresetMin] = useState(25);

  const [minutes, setMinutes] = useState(presetMin);
  const [seconds, setSeconds] = useState(0);
  const [isSessionDone, setIsSessionDone] = useState(false);

  useEffect(() => {
    setMinutes(presetMin);
  }, [presetMin]);

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
  }, [seconds, minutes, isActive]);

  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <div>
      <h3>How many minutes?</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => {
            setPresetMin(presetMin - 5);
          }}
          disabled={
            presetMin === 25 || isActive || isSessionDone ? true : false
          }
        >
          <KeyboardArrowDown />
        </IconButton>

        <div className="timer">
          {timerMinutes}:{timerSeconds}
        </div>

        <IconButton
          color="primary"
          onClick={() => {
            setPresetMin(presetMin + 5);
          }}
          disabled={isActive || isSessionDone ? true : false}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>

      {isSessionDone && (
        <Button
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
      )}
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
      )}
    </div>
  );
}

export default Timer;
