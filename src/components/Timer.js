import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";

function Timer({ onReveal, isActive, setIsActive, isDone }) {
  const [presetMin, setPresetMin] = useState(25);

  // const savedTime = {
  //   savedMin: JSON.parse(localStorage.getItem("savedMin")),
  //   savedSec: JSON.parse(localStorage.getItem("savedSec")),
  // };

  const [minutes, setMinutes] = useState(presetMin);
  const [seconds, setSeconds] = useState(0);

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
            onReveal();
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
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
          disabled={presetMin === 25 || isActive ? true : false}
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
          disabled={isActive ? true : false}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>
      <br />
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
          style={{ visibility: isDone ? "hidden" : "visible" }}
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
