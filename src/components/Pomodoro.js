import { useState, useEffect, useCallback, useRef } from "react";
import { ImageBlocker } from "./Pomodoro.styled";
import Timer from "./Timer";

function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  const [numPomodoro, setNumPomodoro] = useState(1);
  const [reveal, setReveal] = useState(
    // [false, false].concat(Array(numPomodoro - 2).fill(false))
    Array(numPomodoro).fill(false)
  );
  const [isDone, setIsDone] = useState(false);

  const imgWidth = 350;
  const imgHeight = 300;
  let gridColumn, gridRow;

  //use switch case
  //for loop?
  // useEffect(() => {
  //   for (let i = 5; i >= 1; i--) {
  //     if (numPomodoro % i === 0 && numPomodoro > i * 2) {
  //       gridColumn = numPomodoro / i;
  //       gridRow = i;
  //       return;
  //     }
  //   }
  // }, [numPomodoro]);

  for (let i = 10; i > 1; i--) {
    if (numPomodoro === 4) {
      gridColumn = 2;
      gridRow = 2;
      break;
    } else if (numPomodoro % i === 0 && numPomodoro >= i * 3) {
      gridColumn = numPomodoro / i;
      gridRow = i;
      break;
    } else {
      gridColumn = numPomodoro;
      gridRow = 1;
    }
  }

  // if (numPomodoro % 5 === 0 && numPomodoro > 10) {
  //   gridColumn = numPomodoro / 5;
  //   gridRow = 5;
  // } else if (numPomodoro % 4 === 0 && numPomodoro > 8) {
  //   gridColumn = numPomodoro / 4;
  //   gridRow = 4;
  // } else if (numPomodoro % 3 === 0 && numPomodoro > 6) {
  //   gridColumn = numPomodoro / 3;
  //   gridRow = 3;
  // } else if (numPomodoro % 2 === 0) {
  //   gridColumn = numPomodoro / 2;
  //   gridRow = 2;
  // } else {
  //   gridColumn = numPomodoro;
  //   gridRow = 1;
  // }
  const gridColumnSize = imgWidth / gridColumn;
  // console.log("px", gridColumnSize);
  const gridRowSize = imgHeight / gridRow;

  const onPlus = () => {
    const tempNum = numPomodoro + 1;
    setNumPomodoro(tempNum);
    const tempReveal = [...reveal];

    const totalReveal = tempReveal.filter((x) => x === true).length;
    console.log("plusreveal", totalReveal, tempNum);
    if (totalReveal >= tempNum) {
      setIsDone(true);
    } else {
      setIsDone(false);
    }
  };

  const onMinus = () => {
    if (numPomodoro === 1) {
      return;
    } else {
      const tempNum = numPomodoro - 1;
      setNumPomodoro(tempNum);
      const tempReveal = [...reveal];

      const totalReveal = tempReveal.filter((x) => x === true).length;
      console.log("plusreveal", totalReveal, tempNum);
      if (totalReveal >= tempNum) {
        setIsDone(true);
      } else {
        setIsDone(false);
      }
    }
  };
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

  const Tiles = useCallback(() => {
    console.log("num", numPomodoro);

    // useEffect(() => {
    //   setTilesArray(tempTiles);
    // }, [tempTiles]);
    const tilesArray = [];

    for (let i = 1; i <= numPomodoro; i++) {
      tilesArray.push(
        <ImageBlocker
          key={i}
          index={i}
          reveal={reveal[i - 1]}
          isDone={isDone}
        />
      );
    }

    return tilesArray; // how to access this
  }, [numPomodoro, reveal]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>Goal Name</h1>
      {isDone ? <h2>Congrats</h2> : <h2>Progress: totalReveal/numPomodoro</h2>}
      {/* {isDone && <h2>Congratulations. You finished it!</h2>} */}
      {/* <div style={{ width: "400px" }} className="img-holder">
        {console.log(goalImg)}
        <img src={goalImg} width="100%" alt="" id="img" className="img" />
      </div> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat( ${gridColumn}, ${gridColumnSize}px`,
          gridTemplateRows: `repeat( ${gridRow}, ${gridRowSize}px )`,
          width: imgWidth,
          height: imgHeight,
          background: `url(${goalImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "solid 1px black",
          boxShadow: "0 10px 20px grey",
          overflow: "hidden",
          boxSizing: "content-box",
        }}
      >
        <Tiles />
      </div>
      <button onClick={onReveal}>Reveal</button>
      <h3>How many Pomodoros to finish this goal?</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          disabled={isDone || numPomodoro === 1 ? true : false}
          onClick={onMinus}
          style={{ width: "30px", padding: "5px" }}
        >
          -
        </button>
        <p style={{ margin: "0 5px" }}>{numPomodoro}</p>
        <button onClick={onPlus} style={{ width: "30px", padding: "5px" }}>
          +
        </button>
      </div>
      <Timer />

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
