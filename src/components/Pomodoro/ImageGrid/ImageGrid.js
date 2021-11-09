import React, { useCallback } from "react";
import { Tiles } from "./ImageGrid.styled";

export default function ImageGrid({ numPomodoro, reveal, isDone, goalImg }) {
  const ImageBlocker = useCallback(() => {
    const tilesArray = [];

    for (let i = 1; i <= numPomodoro; i++) {
      tilesArray.push(
        <Tiles key={i} index={i} reveal={reveal[i - 1]} isDone={isDone} />
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

  let gridColumnSize = imgWidth / gridColumn;

  //for those that don't divide equally
  if ((imgWidth / gridColumn) % 10 !== 0) {
    console.log((imgWidth / gridColumn) % 10);
    gridColumnSize += 0.04;
  }

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
        <ImageBlocker />
      </div>
    </div>
  );
}
