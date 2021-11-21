import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import Random from "./Settings/Random";
import Session from "./Settings/Session";
import Duration from "./Settings/Duration";

const SettingsButton = ({
  updateBlockers,
  blockers,
  isRandom,
  handleToggle,
  onReveal,

  isDone,
  setIsDone,
  reveal,
  isActive,
  setReveal,
  setIsActive,
  setMinutes,
  presetMin,
  setPresetMin,
  isSessionDone,
  setIsSessionDone,
  setGuide,
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginLeft: "auto" }}>
      <Tooltip title="Settings">
        <IconButton
          disabled={isActive ? true : false}
          onClick={() => {
            setOpen(true);
            setGuide(false);
          }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <Box
          sx={{
            width: "80vw",
            maxWidth: "350px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              bgcolor: "#1976D2",
            }}
          >
            <DialogTitle sx={{ color: "white" }}>Settings</DialogTitle>
            <IconButton
              sx={{ marginLeft: "auto", color: "white" }}
              onClick={handleClose}
              aria-label="close button"
              component="span"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ textAlign: "center", padding: "1rem" }}>
            <Random isRandom={isRandom} handleToggle={handleToggle} />
            <Session
              blockers={blockers}
              updateBlockers={updateBlockers}
              isDone={isDone}
              setIsDone={setIsDone}
              reveal={reveal}
              isActive={isActive}
              setReveal={setReveal}
            />
            {/* Timer is being rerendered after adding numPomodoro, maybe because of the conditional rendering isActive */}
            <Duration
              onReveal={onReveal}
              isActive={isActive}
              setIsActive={setIsActive}
              isDone={isDone}
              setMinutes={setMinutes}
              presetMin={presetMin}
              setPresetMin={setPresetMin}
              isSessionDone={isSessionDone}
              setIsSessionDone={setIsSessionDone}
            />
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default SettingsButton;
