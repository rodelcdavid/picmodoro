import { Button, IconButton } from "@mui/material";
import React from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const NewGoal = ({ setScreenState, setGoalImg, setGoalName, defaultImg }) => {
  return (
    <div>
      {/* <Button
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
          setGoalName("");
        }}
        startIcon={<AutorenewIcon />}
        variant="contained"
        color="success"
      >
        New Goal
      </Button> */}
      <IconButton
        onClick={() => {
          setScreenState(0);
          setGoalImg(defaultImg);
          setGoalName("");
        }}
        color="primary"
        aria-label="upload picture"
        component="span"
      >
        <AutorenewIcon />
      </IconButton>
    </div>
  );
};

export default NewGoal;
