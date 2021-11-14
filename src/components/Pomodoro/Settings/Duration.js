import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React, { useEffect } from "react";

function Duration({ presetMin, setPresetMin }) {
  useEffect(() => {
    setPresetMin(presetMin);
  }, [presetMin, setPresetMin]);

  return (
    <div>
      <h5>Duration</h5>
      <div
        style={{
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

        <div className="timer">{presetMin}:00</div>

        <IconButton
          color="primary"
          onClick={() => {
            setPresetMin(presetMin + 5);
          }}
        >
          <KeyboardArrowUp />
        </IconButton>
      </div>
    </div>
  );
}

export default Duration;
