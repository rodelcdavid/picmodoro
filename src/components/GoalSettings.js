import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import {
  updateBlockers,
  toggleIsRandom,
  updatePresetMin,
  saveSettingsAsync,
} from "../features/goalSlice";

import { updateMinutes } from "../features/timerSlice";

import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

const GoalSettings = ({ setGuide, goalIdParam, currentGoal }) => {
  const {
    is_random: isRandom,
    blockers,
    preset_min: presetMin,
    is_done: isDone,
  } = currentGoal;

  const [open, setOpen] = useState(false);

  //Selectors

  const { isActive } = useSelector((state) => state.timerState);

  //Dispatch
  const dispatch = useDispatch();
  const _toggleIsRandom = (payload) => dispatch(toggleIsRandom(payload));
  const _updateBlockers = (payload) => dispatch(updateBlockers(payload));
  const _updatePresetMin = (payload) => dispatch(updatePresetMin(payload));

  //Handlers

  const handleClose = () => {
    dispatch(
      saveSettingsAsync({ currentGoal: currentGoal, id: currentGoal.id })
    ).catch(() => console.log("There was a problem connecting to the server."));
    setOpen(false);
  };

  const handleToggle = (e) => {
    _toggleIsRandom({ id: goalIdParam, isRandom: e.target.checked });
  };

  const onPlus = () => {
    _updateBlockers({
      id: goalIdParam,
      blockers: [...blockers, { clickable: false, reveal: false }],
    });
  };

  const onMinus = () => {
    const reveal = blockers.map((blocker) => blocker.reveal);
    const lastItemIndex = reveal.lastIndexOf(false);
    _updateBlockers({
      id: goalIdParam,
      blockers: blockers.filter((blocker, i) => i !== lastItemIndex),
    });
  };

  //useEffects
  useEffect(() => {
    dispatch(updateMinutes(presetMin));
  }, [presetMin, dispatch]);

  return (
    <div>
      {/* Icon Button*/}
      <Box
        sx={{
          justifySelf: "flex-end",
        }}
      >
        <Tooltip title="Settings">
          <IconButton
            sx={{ color: "rgba(0,0,0,0.87)" }}
            disabled={isActive ? true : false}
            onClick={() => {
              setOpen(true);
              setGuide(false);
            }}
            color="primary"
            aria-label="settings picture"
            component="span"
          >
            <SettingsIcon sx={{ color: "#284E91" }} />
          </IconButton>
        </Tooltip>
      </Box>

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
            <DialogTitle sx={{ color: "white" }}>Goal Settings</DialogTitle>
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

          <DialogContent sx={{ textAlign: "center", padding: "1rem" }}>
            {/* Random */}
            <h5>Random Reveal</h5>
            <Switch
              checked={isRandom}
              onChange={handleToggle}
              color="primary"
            />

            {/* Sessions */}
            <h5>Sessions</h5>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="primary"
                disabled={
                  isDone || blockers.length === 1 || isActive ? true : false
                }
                onClick={onMinus}
              >
                <KeyboardArrowDown />
              </IconButton>

              <p style={{ margin: "0 5px" }}>{blockers.length}</p>
              <IconButton
                color="primary"
                disabled={isActive ? true : false}
                onClick={onPlus}
              >
                <KeyboardArrowUp />
              </IconButton>
            </Box>

            {/* Duration */}
            <h5>Duration</h5>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                color="primary"
                onClick={() => {
                  _updatePresetMin({
                    id: goalIdParam,
                    presetMin: presetMin - 5,
                  });
                  // _updatePresetMin(presetMin - 5);
                }}
                disabled={presetMin === 25 ? true : false}
              >
                <KeyboardArrowDown />
              </IconButton>

              <Box>{presetMin}:00</Box>

              <IconButton
                color="primary"
                onClick={() => {
                  _updatePresetMin({
                    id: goalIdParam,
                    presetMin: presetMin + 5,
                  });
                }}
              >
                <KeyboardArrowUp />
              </IconButton>
            </Box>
          </DialogContent>
          <Divider />
        </Box>
      </Dialog>
    </div>
  );
};

export default GoalSettings;
