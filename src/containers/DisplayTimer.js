import { Button } from "@mui/material";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;

  //if timer is active, discard
  //if timer is not active && issessiondone, reset
  //if timer is not active && isDone congrats
  //if timer is not active, start

  return (
    <div>
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
        setIsSessionDone={setIsSessionDone}
        isDone={isDone}
        setMinutes={setMinutes}
        setSeconds={setSeconds}
        setIsActive={setIsActive}
        presetMin={presetMin}
      />
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
