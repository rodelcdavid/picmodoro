import { Box } from "@mui/system";
import React, { useCallback } from "react";
import { getGridValues } from "../../../utils/helpers";

export default function ImageGrid({ numPomodoro, reveal, isDone, goalImg }) {
  const ImageBlocker = useCallback(() => {
    const tilesArray = [];

    for (let i = 1; i <= numPomodoro; i++) {
      tilesArray.push(
        <Box
          sx={{
            backgroundColor: reveal[i - 1] ? "none" : "#F6F5F5",
            border: isDone ? "none" : "solid 1px black",
          }}
          key={i}
          index={i}
        />
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Box
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
          // boxShadow: "0 5px 10px #fff",
          overflow: "hidden",
          boxSizing: "content-box",
        }}
      >
        <ImageBlocker />
      </Box>
    </Box>
  );
}
