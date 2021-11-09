import { Button } from "@mui/material";
import React from "react";

const NewGoal = ({ setScreenState, setGoalImg, setGoalName, defaultImg }) => {
  return (
    <div>
      <Button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
          setGoalName("");
        }}
        variant="contained"
        color="success"
      >
        New Goal
      </Button>
    </div>
  );
};

export default NewGoal;
