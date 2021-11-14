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

const NewGoalButton = ({
  setScreenState,
  setGoalImg,
  setGoalName,
  defaultImg,
  isActive,
}) => {
  const [openNewGoalDialog, setOpenNewGoalDialog] = useState(false);

  const handleClose = () => {
    setOpenNewGoalDialog(false);
  };

  const handleNewGoal = () => {
    setScreenState(0);
    setGoalImg(defaultImg);
    setGoalName("");
  };
  return (
    <div>
      <Tooltip title="New Goal">
        <IconButton
          disabled={isActive ? true : false}
          onClick={() => {
            setOpenNewGoalDialog(true);
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
        open={openNewGoalDialog}
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
    </div>
  );
};

export default NewGoalButton;
