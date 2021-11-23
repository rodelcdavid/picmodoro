import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";

import { updateGoalName, updateGoalImage } from "../features/goal";
import {
  toggleIsSessionDone,
  updateMinutes,
  updateSeconds,
} from "../features/timer";

import {
  updateBlockers,
  toggleIsRandom,
  updatePresetMin,
} from "../features/settings";

import { toggleIsDone } from "../features/displayGrid";
import { updateScreen } from "../features/screen";
import placeholder from "../assets/placeholder.jpg";

const NewGoalButton = () => {
  console.log("NewGoalButton");

  const [open, setOpen] = useState(false);

  //Selector
  const { isActive } = useSelector((state) => state.timerState);

  //Dispatch
  const dispatch = useDispatch();
  const _updateGoalImage = (image) => dispatch(updateGoalImage(image));
  const _updateGoalName = (name) => dispatch(updateGoalName(name));
  const _toggleIsSessionDone = (bool) => dispatch(toggleIsSessionDone(bool));
  const _updateMinutes = (min) => dispatch(updateMinutes(min));
  const _updateSeconds = (sec) => dispatch(updateSeconds(sec));
  const _updateBlockers = (blockers) => dispatch(updateBlockers(blockers));
  const _toggleIsRandom = (checked) => dispatch(toggleIsRandom(checked));
  const _updatePresetMin = (min) => dispatch(updatePresetMin(min));
  const _toggleIsDone = (bool) => dispatch(toggleIsDone(bool));
  const _updateScreen = (value) => dispatch(updateScreen(value));

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewGoal = () => {
    //how to reset store state
    _updateScreen(0);
    _updateGoalImage(placeholder);
    _updateGoalName("");

    _toggleIsSessionDone(false);
    _updateMinutes(0);
    _updateSeconds(0);

    _updateBlockers([{ clickable: false, reveal: false }]); //set to initial state
    _updatePresetMin(0.1); //set to 25
    _toggleIsRandom(false);
    _toggleIsDone(false);
  };
  return (
    <Box
      sx={{
        marginRight: "auto",
        boxShadow: "0 5px 5px rgba(0,0,0,0.5)",
        borderRadius: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Tooltip title="New Goal">
        <IconButton
          disabled={isActive ? true : false}
          onClick={() => {
            setOpen(true);
          }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <AutorenewIcon />
        </IconButton>
      </Tooltip>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ bgcolor: "#1976D2", color: "white" }}
          id="alert-dialog-title"
        >
          {"Set new goal?"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reset all your current progress and will create a new
            goal.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleNewGoal}>New Goal</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NewGoalButton;
