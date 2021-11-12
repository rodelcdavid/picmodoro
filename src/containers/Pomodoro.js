import { useState, useEffect } from "react";
import Details from "../components/Pomodoro/Details";
import ImageGrid from "../components/Pomodoro/ImageGrid/ImageGrid";
import Duration from "../components/Pomodoro/Settings/Duration";
import NewGoal from "../components/Pomodoro/Settings/NewGoal";
import Random from "../components/Pomodoro/Settings/Random";
import Session from "../components/Pomodoro/Settings/Session";

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
      <Details
        goalName={goalName}
        computeReveal={computeReveal}
        numPomodoro={numPomodoro}
      />
      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />

      {/* {isDone ? <h2>Congratulations</h2> : <h2>Hi</h2>} */}
      <Random
        isRandom={isRandom}
        handleToggle={handleToggle}
        onReveal={onReveal}
      />
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
      <NewGoal
        setScreenState={setScreenState}
        setGoalImg={setGoalImg}
        setGoalName={setGoalName}
        defaultImg={defaultImg}
      />
    </div>
  );
}

export default Pomodoro;
