import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback } from "react";

const getGridValues = (numPomodoro, wide) => {
  // const imgWidth = wide ? 600 : 350;
  // const imgHeight = wide ? 400 : 300;

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
    // console.log((imgWidth / gridColumn) % 10);
    gridColumnSize += 0.04;
  }

  const gridRowSize = imgHeight / gridRow;

  const gridValues = {
    imgWidth,
    imgHeight,
    gridColumnSize,
    gridRowSize,
    gridColumn,
    gridRow,
  };
  return gridValues;
};

export default function ImageGrid({ numPomodoro, reveal, isDone, goalImg }) {
  const wide = useMediaQuery("(min-width:600px");

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

  const {
    imgWidth,
    imgHeight,
    gridColumnSize,
    gridRowSize,
    gridColumn,
    gridRow,
  } = getGridValues(numPomodoro, wide);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        marginTop: "1rem",
      }}
    >
      <Box
        style={{
          //sx or style?
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
