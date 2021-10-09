import { useState, useEffect } from "react";

function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  const [numPomodoro, setNumPomodoro] = useState(2);
  const onPlus = () => {
    setNumPomodoro(numPomodoro + 2);
  };

  let gridColumn, gridRow;
  if (numPomodoro % 5 === 0 && numPomodoro > 10) {
    gridColumn = numPomodoro / 5;
    gridRow = 5;
  } else if (numPomodoro % 4 === 0 && numPomodoro > 8) {
    gridColumn = numPomodoro / 4;
    gridRow = 4;
  } else if (numPomodoro % 3 === 0 && numPomodoro > 6) {
    gridColumn = numPomodoro / 3;
    gridRow = 3;
  } else {
    gridColumn = numPomodoro / 2;
    gridRow = 2;
  }
  const gridColumnSize = 350 / gridColumn;
  const gridRowSize = 300 / gridRow;

  const onMinus = () => {
    if (numPomodoro === 2) {
      return;
    } else {
      setNumPomodoro(numPomodoro - 2);
    }
  };

  const Tiles = () => {
    console.log("num", numPomodoro);
    const tilesArray = [];
    for (let i = 1; i <= numPomodoro; i++) {
      tilesArray.push(
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            border: "solid 1px black",
          }}
          key={i}
        ></div>
      );
    }
    return tilesArray;
  };
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
      {/* <div style={{ width: "400px" }} className="img-holder">
        {console.log(goalImg)}
        <img src={goalImg} width="100%" alt="" id="img" className="img" />
      </div> */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat( ${gridColumn}, ${gridColumnSize}px`,
          gridTemplateRows: `repeat( ${gridRow}, ${gridRowSize} )`,
          width: "350px",
          height: "300px",
          background: `url(${goalImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          border: "solid 1px black",
        }}
      >
        <Tiles />
      </div>
      <h3>How many Pomodoros to finish this goal?</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button onClick={onMinus} style={{ height: "20px" }}>
          -
        </button>
        <p style={{ margin: "0 5px" }}>{numPomodoro}</p>
        <button onClick={onPlus} style={{ height: "20px" }}>
          +
        </button>
      </div>
      <h3>How many minutes each Pomodoro?</h3>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button style={{ height: "20px" }}>-</button>
        <h2 style={{ margin: "0 5px" }}>25:00</h2>
        <button style={{ height: "20px" }}>+</button>
      </div>
      <button>Start timer!</button>

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
