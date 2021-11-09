import { TextField } from "@mui/material";
import React from "react";

const InputName = ({ textRef, goalName, nameHandler }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2 style={{ marginBottom: "5px" }}>
        <span style={{ color: "#00ADB5" }}>Step 1: </span>What is your goal?
      </h2>
      <TextField
        inputRef={textRef}
        id="outlined-name"
        label="Enter goal name"
        value={goalName}
        onChange={nameHandler}
        style={{ width: "500px", marginBottom: "5px" }}
      />
    </div>
  );
};

export default InputName;
