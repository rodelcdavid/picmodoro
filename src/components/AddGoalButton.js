import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import GoalSetup from "./GoalSetup";

const AddGoalButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    //Open setup dialog
    setOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          width: ["100px", "200px"],
          height: ["100px", "200px"],
          display: "flex",
          flexDirection: "column",
          border: "solid 1px black",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bolder",
          fontSize: "5rem",
          cursor: "pointer",
          boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
          transition: "all ease-in 200ms",
          color: "#1e3c72",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
        component="button"
        onClick={handleAdd}
      >
        +
      </Box>
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
          {"Add New Picmodoro Goal"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <GoalSetup />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddGoalButton;
