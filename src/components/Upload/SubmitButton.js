import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const SubmitButton = ({ onSubmit }) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Typography variant="h6">
        <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
          Step 3:{" "}
        </Box>
        Submit and start!
      </Typography>
      <Button
        sx={{ alignSelf: "center", width: "60%" }}
        onClick={onSubmit}
        variant="contained"
      >
        Submit
      </Button>
    </Box>
  );
};

export default SubmitButton;
