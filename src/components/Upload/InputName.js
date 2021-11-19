import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const InputName = ({ nameFieldRef, goalName, nameHandler, nameError }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h6">
        <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
          Step 1:{" "}
        </Box>
        What is your goal?
      </Typography>
      <Box sx={{ width: "100%", alignSelf: "center", marginTop: "5px" }}>
        <TextField
          error={nameError ? true : false}
          className="name-field"
          fullWidth
          inputRef={nameFieldRef}
          id="outlined-name"
          label="Enter goal name"
          value={goalName}
          onChange={nameHandler}
          helperText={
            nameError
              ? "Please enter your goal name."
              : "Ex. Finish Atomic Habits book, Score A+ on Math"
          }
        />
      </Box>
    </Box>
  );
};

export default InputName;
