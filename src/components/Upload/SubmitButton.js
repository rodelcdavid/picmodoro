import { Button } from "@mui/material";
import React from "react";

const SubmitButton = ({ onSubmit }) => {
  return (
    <div>
      <h1>
        <span style={{ color: "#00ADB5" }}>Step 3: </span>Submit and start!
      </h1>
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
