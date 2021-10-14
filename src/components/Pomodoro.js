import { useState, useEffect, useCallback, useRef } from "react";
import ImageGrid from "./ImageGrid";
import Session from "./Session";

import Timer from "./Timer";

function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  const [numPomodoro, setNumPomodoro] = useState(1);
  const [reveal, setReveal] = useState(
    // [false, false].concat(Array(numPomodoro - 2).fill(false))
    Array(numPomodoro).fill(false)
  );
  const [isDone, setIsDone] = useState(false);

  // const tile = useRef();

  const onReveal = () => {
    const tempReveal = [...reveal];
    console.log("temp", tempReveal);
    const totalReveal = tempReveal.filter((x) => x === true).length;
    if (totalReveal + 1 === numPomodoro) {
      setIsDone(true);
    }
    if (totalReveal !== numPomodoro) {
      tempReveal[totalReveal] = true;
    }

    setReveal(tempReveal);
  };

  const onRevealRandom = () => {
    const tempReveal = { ...reveal };
    //select item from array that is still false
    // let randomReveal = Math.floor(Math.random() * numPomodoro) + 1;

    // while (tempReveal[randomReveal]) {
    //   tempReveal.filter;
    //   randomReveal = Math.floor(Math.random() * numPomodoro) + 1;
    // }
    // tempReveal[randomReveal] = true;
    // setReveal(tempReveal);

    // console.log("ran", randomReveal);
    // console.log("ref", tile.current);
    //map tilesarray and change background color
    // if (tilesArray) {
    //   // tilesArray[0].props.style.backgroundColor = "none";
    //   console.log("tilesarray", tilesArray[0].props.style.backgroundColor);
    // }
  };
  // const tilesArray = []; // should be a state
  // const [tilesArray, setTilesArray] = useState([]);

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <ImageGrid
        numPomodoro={numPomodoro}
        reveal={reveal}
        isDone={isDone}
        goalImg={goalImg}
      />

      <button onClick={onReveal}>Reveal</button>
      <Session
        numPomodoro={numPomodoro}
        setNumPomodoro={setNumPomodoro}
        isDone={isDone}
        setIsDone={setIsDone}
        reveal={reveal}
      />
      <Timer onReveal={onReveal} />

      <button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Pomodoro;
