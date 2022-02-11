import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import GoalSetup from "./GoalSetup";

const AddGoalButton = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    setOpen(true);
  };
  return (
    <>
      <Box
        sx={{
          width: "200px",
          height: "220px",
          display: "flex",
          flexDirection: "column",
          border: "solid 1px rgba(0,0,0,0.87)",
          borderRadius: "10px",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          fontWeight: "bolder",
          fontSize: "2rem",
          cursor: "pointer",

          transition: "all ease-in 200ms",
          backgroundColor: "#e5e5e5",
          // color: "#1e3c72",
          color: "rgba(0,0,0,0.87)",
          "&:hover": { boxShadow: "0 5px 10px rgba(0,0,0,0.5)" },
        }}
        component="button"
        onClick={handleAdd}
      >
        <AddCircleIcon fontSize="1rem" />
        <Typography variant="body1">Add New Goal</Typography>
      </Box>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          sx={{ bgcolor: "#1976D2", color: "#fff" }}
          id="alert-dialog-title"
        >
          {"Add New Goal"}
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
