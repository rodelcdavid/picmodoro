import React, { useCallback } from "react";
import { getGridValues } from "../../../utils/helpers";
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

  const [
    imgWidth,
    imgHeight,
    gridColumnSize,
    gridRowSize,
    gridColumn,
    gridRow,
  ] = getGridValues(numPomodoro);

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
