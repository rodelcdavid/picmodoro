import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";

function Duration({ presetMin, setPresetMin }) {
  useEffect(() => {
    setPresetMin(presetMin);
  }, [presetMin, setPresetMin]);

  return (
    <>
      <h5>Duration</h5>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          color="primary"
          onClick={() => {
            setPresetMin(presetMin - 5);
          }}
          disabled={presetMin === 25 ? true : false}
        >
          <KeyboardArrowDown />
        </IconButton>

        <Box>{presetMin}:00</Box>

        <IconButton
          color="primary"
          onClick={() => {
            setPresetMin(presetMin + 5);
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </Box>
    </>
  );
}

export default Duration;
