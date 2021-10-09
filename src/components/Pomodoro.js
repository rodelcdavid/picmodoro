import { useState, useEffect } from "react";

function Pomodoro({ goalImg, defaultImg, setGoalImg, setScreenState }) {
  const [numPomodoro, setNumPomodoro] = useState(3);
  const onPlus = () => {
    setNumPomodoro(numPomodoro + 3);
  };

  const gridColumn = numPomodoro / 3;
  const gridColumnSize = 350 / gridColumn;
  const onMinus = () => {
    if (numPomodoro === 3) {
      return;
    } else {
      setNumPomodoro(numPomodoro - 3);
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
          gridTemplateRows: "repeat( 3, 100px )",
          width: "350px",
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
