import React, { useCallback } from "react";
import { ImageBlocker } from "./ImageGrid.styled";

export default function ImageGrid({ numPomodoro, reveal, isDone, goalImg }) {
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
  }, [numPomodoro, reveal, isDone]);

  const imgWidth = 350;
  const imgHeight = 300;
  let gridColumn, gridRow;

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

  const gridColumnSize = imgWidth / gridColumn;
  const gridRowSize = imgHeight / gridRow;

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
    </div>
  );
}
