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
  isRandom,
  handleToggle,
  onReveal,
  numPomodoro,
  setNumPomodoro,
  isDone,
  setIsDone,
  reveal,
  isActive,
  setReveal,
  setIsActive,
}) => {
  const [openSettings, setOpenSettings] = useState(false);
  const handleCloseSettings = () => {
    setOpenSettings(false);
  };

  return (
    <div>
      <Tooltip title="Settings">
        <IconButton
          onClick={() => {
            setOpenSettings(true);
          }}
          color="primary"
          aria-label="upload picture"
          component="span"
        >
          <SettingsIcon />
        </IconButton>
      </Tooltip>

      {/* Dialog */}
      <Dialog open={openSettings} onClose={handleCloseSettings}>
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
              onClick={handleCloseSettings}
              aria-label="close button"
              component="span"
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ textAlign: "center", padding: "1rem" }}>
            <Random
              isRandom={isRandom}
              handleToggle={handleToggle}
              onReveal={onReveal}
            />
            <Session
              numPomodoro={numPomodoro}
              setNumPomodoro={setNumPomodoro}
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
            />
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};

export default SettingsButton;
