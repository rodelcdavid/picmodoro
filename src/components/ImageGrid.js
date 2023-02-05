import { Skeleton, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const getGridValues = (numBlockers, wide) => {
  //TODO: make this 3 sizes, 3 media q
  const imgWidth = wide ? 476 : 280;
  const imgHeight = wide ? 340 : 200;

  let gridColumn, gridRow;

  for (let i = 10; i > 1; i--) {
    if (numBlockers === 4) {
      gridColumn = 2;
      gridRow = 2;
      break;
    } else if (numBlockers % i === 0 && numBlockers >= i * 3) {
      gridColumn = numBlockers / i;
      gridRow = i;
      break;
    } else {
      gridColumn = numBlockers;
      gridRow = 1;
    }
  }

  let gridColumnSize = imgWidth / gridColumn;

  //for those that don't divide equally
  if ((imgWidth / gridColumn) % 10 !== 0) {
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

const ImageGrid = ({ currentGoal }) => {
  const { image_url: goalImage, blockers } = currentGoal;

  //Selectors
  const { isDone } = useSelector((state) => state.displayGridState);

  const wide = useMediaQuery("(min-width:580px");

  //preload image
  const [imagePreloaded, setImagePreloaded] = useState(false);
  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImagePreloaded(true);
    };
    img.src = currentGoal.image_url;
  }, [currentGoal]);

  const ImageBlocker = useCallback(() => {
    return (
      <>
        {blockers.map((blocker, i) => (
          <Box
            key={i}
            sx={{
              border: isDone ? "none" : "solid 1px rgba(0,0,0,0.6)",
              backgroundColor: blocker.reveal ? "transparent" : "#fff",
              cursor: blocker.clickable ? "pointer" : "default",
            }}
          />
        ))}
      </>
    );
  }, [blockers, isDone]);

  const {
    imgWidth,
    imgHeight,
    gridColumnSize,
    gridRowSize,
    gridColumn,
    gridRow,
  } = getGridValues(blockers.length, wide);

  return (
    <Box>
      {imagePreloaded ? (
        <Box
          style={{
            //sx or style?
            display: "grid",
            gridTemplateColumns: `repeat( ${gridColumn}, ${gridColumnSize}px`,
            gridTemplateRows: `repeat( ${gridRow}, ${gridRowSize}px )`,
            width: imgWidth,
            height: imgHeight,
            background: `url(${goalImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            border: "solid 1px rgba(0,0,0,0.6)",
            boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
            overflow: "hidden",
            boxSizing: "content-box",
          }}
        >
          <ImageBlocker />
        </Box>
      ) : (
        <Skeleton
          sx={{
            backgroundColor: "#fff",
            border: "2px solid rgba(0,0,0,0.6)",
            boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
            boxSizing: "content-box",
          }}
          variant="rectangular"
          width={imgWidth}
          height={imgHeight}
          animation="wave"
        />
      )}
    </Box>
  );
};
export default ImageGrid;
