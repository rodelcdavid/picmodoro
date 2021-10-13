import React, { useState, useEffect, useRef } from "react";

export default function CountdownTimer({ onReveal }) {
  // const [presetMin, setPresetMin] = useState(25);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  // const [displayMessage, setDisplayMessage] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // useEffect(() => {
  //   if (isActive) {
  //     let interval = setInterval(() => {
  //       clearInterval(interval);

  //       // if (minutes === 0 && seconds === 0) {
  //       // }
  //       if (seconds === 0) {
  //         if (minutes !== 0) {
  //           setSeconds(59);
  //           setMinutes(minutes - 1);
  //         } else {
  //           clearInterval(interval);
  //           onReveal();
  //           // let minutes = displayMessage ? 24 : 4;
  //           // let seconds = 59;

  //           // setSeconds(seconds);
  //           // setMinutes(minutes);
  //           // setDisplayMessage(!displayMessage);
  //         }
  //       } else {
  //         setSeconds(seconds - 1);
  //       }
  //     }, 1000);
  //   }
  // }, [seconds, isActive]);

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
    <div className="pomodoro">
      {/* <div className="message">
        {displayMessage && <div>Break time! New session starts in:</div>}
      </div> */}
      <div className="timer">
        {timerMinutes}:{timerSeconds}
      </div>
      {/* <button
        onClick={() => {
          setPresetMin((prev) => prev - 5);
          setMinutes(presetMin);
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          const prevMin = presetMin;
          setPresetMin(prevMin + 5);
          setMinutes(presetMin);
        }}
      >
        +
      </button>
      <br /> */}
      {!isActive && <button onClick={() => setIsActive(true)}>Start!</button>}
      <button
        onClick={() => {
          setMinutes(25);
          setSeconds(0);
          setIsActive(false);
        }}
      >
        Reset timer
      </button>
    </div>
  );
}
