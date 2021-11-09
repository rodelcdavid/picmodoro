import { Button } from "@mui/material";
import React from "react";

const SubmitButton = ({ onSubmit }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>
        <span style={{ color: "#00ADB5" }}>Step 3: </span>Submit and start!
      </h2>
      <Button onClick={onSubmit} variant="contained">
        Submit
      </Button>
    </div>
  );
};

export default SubmitButton;
