import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  Divider,
  IconButton,
  Switch,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
// import {
//   // toggleIsRandom,
//   // updateBlockers,
//   // updatePresetMin,
// } from "../features/settingsSlice";

import {
  updateBlockers,
  toggleIsRandom,
  updatePresetMin,
} from "../features/goalSlice";

import { updateMinutes } from "../features/timerSlice";

import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";

//You can break this down again to minimize rerender on settings change
const Settings = ({ setGuide, goalIdParam, currentGoal }) => {
  // const { goalList } = useSelector((state) => state.goalState);

  // const currentGoal = goalList.filter((goal) => {
  //   return goal.id === goalIdParam;
  // });

  // const { isRandom, blockers, presetMin, isDone } = currentGoal[0];
  const { isRandom, blockers, presetMin, isDone } = currentGoal;

  // const renderCount = useRef(0);
  // renderCount.current += 1;
  // console.log("Settings rendered:", renderCount.current);
  //where should guide state live
  //Local state
  const [open, setOpen] = useState(false);

  //Selectors
  // const { isRandom, blockers, presetMin } = useSelector(
  //   (state) => state.settingsState
  // );

  // const { isDone } = useSelector((state) => state.displayGridState);

  const { isActive } = useSelector((state) => state.timerState);

  //Dispatch
  const dispatch = useDispatch();
  const _toggleIsRandom = (payload) => dispatch(toggleIsRandom(payload));

  // const _updateBlockers = (blockers) => dispatch(updateBlockers(blockers));
  const _updateBlockers = (payload) => dispatch(updateBlockers(payload));

  const _updatePresetMin = (payload) => dispatch(updatePresetMin(payload));

  //Handlers

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = (e) => {
    _toggleIsRandom({ id: goalIdParam, isRandom: e.target.checked }); //can you refactor this to !isRandom?
  };

  //you can just move the payload directly to the reducer instead, separate addBlockers, subtractBlockers
  const onPlus = () => {
    _updateBlockers({
      id: goalIdParam,
      blockers: [...blockers, { clickable: false, reveal: false }],
    });
    // _updateBlockers([...blockers, { clickable: false, reveal: false }]);
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
    // _updateMinutes(presetMin);
    dispatch(updateMinutes(presetMin));
  }, [presetMin, dispatch]);

  return (
    <div>
      {/* Icon Button*/}
      <Box
        sx={{
          marginLeft: "auto",
          boxShadow: "0 5px 5px rgba(0,0,0,0.5)",
          borderRadius: "100%",
          backgroundColor: "#fff",
        }}
      >
        <Tooltip title="Settings">
          <IconButton
            disabled={isActive ? true : false}
            onClick={() => {
              setOpen(true);
              setGuide(false);
            }}
            color="primary"
            aria-label="settings picture"
            component="span"
          >
            <SettingsIcon />
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

          {/* Here */}
          <Box sx={{ textAlign: "center", padding: "1rem" }}>
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
                  // _updatePresetMin(presetMin + 5);
                }}
              >
                <KeyboardArrowUp />
              </IconButton>
            </Box>
          </Box>
          {/* Here */}
        </Box>
      </Dialog>
    </div>
  );
};

export default Settings;