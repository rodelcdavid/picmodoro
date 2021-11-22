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

const NewGoalButton = ({
  setScreenState,
  setGoalImg,
  setGoalName,
  // setReveal,
  setIsSessionDone,
  defaultImg,
  isActive,
  setMinutes,
  setSeconds,

  updateBlockers,
  setPresetMin,
  setIsRandom,
  setIsDone,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleNewGoal = () => {
    //how to reset store state
    setScreenState(0);
    setGoalImg(defaultImg);
    setGoalName("");
    // setReveal([false]);
    setIsSessionDone(false);
    setMinutes(0);
    setSeconds(0);

    updateBlockers([{ clickable: false, reveal: false }]); //set to initial state
    setPresetMin(0.1); //set to 25
    setIsRandom(false);
    setIsDone(false);
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
