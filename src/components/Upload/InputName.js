import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const InputName = ({ textRef, goalName, nameHandler }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h6">
        <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
          Step 1:{" "}
        </Box>
        What is your goal?
      </Typography>
      <Box sx={{ width: "100%", alignSelf: "center" }}>
        <TextField
          className="name-field"
          fullWidth
          inputRef={textRef}
          id="outlined-name"
          label="Enter goal name"
          value={goalName}
          onChange={nameHandler}
          helperText="Ex. Finish Atomic Habits book, Score A+ on Math"
        />
      </Box>
    </Box>
  );
};

export default InputName;
