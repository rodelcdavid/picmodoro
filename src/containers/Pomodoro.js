import { useState, useEffect } from "react";
import Details from "../components/Pomodoro/Details";
import ImageGrid from "../components/Pomodoro/ImageGrid/ImageGrid";
import Duration from "../components/Pomodoro/Settings/Duration";
import NewGoal from "../components/Pomodoro/NewGoal";
import Random from "../components/Pomodoro/Settings/Random";
import Session from "../components/Pomodoro/Settings/Session";
import { Box, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

function Pomodoro({
  goalImg,
  goalName,
  defaultImg,
  setGoalImg,
  setGoalName,
  setScreenState,
}) {
  const [numPomodoro, setNumPomodoro] = useState(1);
  const [reveal, setReveal] = useState([false]);
  const [isDone, setIsDone] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  //optimize this function because it renders twice
  const computeReveal = () => {
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    return [totalReveal, tempReveal];
  };

  useEffect(() => {
    // console.log("reveal", reveal);
    const tempReveal = [...reveal];
    const totalReveal = tempReveal.filter((x) => x === true).length;

    if (totalReveal === numPomodoro) {
      setIsDone(true);
    }
  }, [reveal, numPomodoro]);

  const handleToggle = (e) => {
    setIsRandom(e.target.checked);
  };

  const onReveal = () => {
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
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "350px",
          margin: "0 auto",
        }}
      >
        <NewGoal
          setScreenState={setScreenState}
          setGoalImg={setGoalImg}
          setGoalName={setGoalName}
          defaultImg={defaultImg}
        />
        <Details
          goalName={goalName}
          computeReveal={computeReveal}
          numPomodoro={numPomodoro}
        />
        <IconButton
          onClick={() => {
            setScreenState(0);
            setGoalImg(defaultImg);
            setGoalName("");
          }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <SettingsIcon />
        </IconButton>
      </Box>

      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />
      <Random
        isRandom={isRandom}
        handleToggle={handleToggle}
        onReveal={onReveal}
      />
      {/* {isDone ? <h2>Congratulations</h2> : <h2>Hi</h2>} */}
      <Box
        sx={{
          border: "solid 2px rgba(0,0,0,.23)",
          borderRadius: "10px",
          width: "350px",
          margin: "1rem auto",
          padding: "1rem",
          position: "relative",
        }}
      >
        <Session
          numPomodoro={numPomodoro}
          setNumPomodoro={setNumPomodoro}
          isDone={isDone}
          setIsDone={setIsDone}
          reveal={reveal}
          isActive={isActive}
          setReveal={setReveal}
        />
        {/* Timer is being rerendered after adding numPomodoro, maybe because of the conditional rendering isActive */}
        <Duration
          onReveal={onReveal}
          isActive={isActive}
          setIsActive={setIsActive}
          isDone={isDone}
        />
        <Box sx={{ position: "absolute", top: 0, right: "5px" }}></Box>
      </Box>
    </div>
  );
}

export default Pomodoro;
