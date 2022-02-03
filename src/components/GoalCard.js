import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  ClickAwayListener,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Popper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  deleteGoal,
  deleteGoalAsync,
  saveNameAsync,
} from "../features/goalSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const GoalCard = ({ id, goalName, goalImage, blockers }) => {
  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  const dispatch = useDispatch();

  //Popover
  const [anchorEl, setAnchorEl] = useState(null);

  //Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Edit mode
  const [renameMode, setRenameMode] = useState(false);

  //Name
  const [name, setName] = useState(goalName);

  const handlePopOver = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    dispatch(deleteGoalAsync({ id: id }))
      // .then(() => setOpenBackdrop(false))
      .catch(() =>
        console.log("There was a problem connecting to the server.")
      );
  };

  const renameRef = useRef();

  const handleRename = (e) => {
    e.preventDefault();
  };

  const handleRenameOption = (e) => {
    e.preventDefault();
    setRenameMode(true);

    setAnchorEl(null);
  };

  const handleBlur = (e) => {
    setRenameMode(false);
    setName(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      setRenameMode(false);
      setName(e.target.value);
    }
    if (e.keyCode === 27) {
      setRenameMode(false);
    }
  };

  //focus input
  useEffect(() => {
    if (renameMode) {
      renameRef.current.focus();
    }
  }, [renameMode]);

  //save to database when name changes
  //this rerender too much

  const firstLoad = useRef(false);
  useEffect(() => {
    if (!firstLoad.current) {
      firstLoad.current = true;
    } else {
      dispatch(saveNameAsync({ id: id, goalName: name }));
    }
  }, [dispatch, name]);

  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        border: "solid 1px #aaa",
        borderRadius: "10px",
        justifyContent: "flex-end",
        alignItems: "center",
        background: `url(${goalImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        // boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        overflow: "hidden",
        textDecoration: "none",
        transition: "all ease-in 200ms",

        "&:hover": { boxShadow: "0 5px 5px rgba(0,0,0,0.5)" },
      }}
      component={RouterLink}
      to={`/${id}`}
    >
      <Box
        sx={{
          color: "#000",
          // backgroundColor: "#1e3c72",
          backgroundColor: "#e5e5e5",
          width: "100%",
          borderTop: "1px solid #aaa",
          padding: "1rem",
          maxHeight: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          position: "relative",
        }}
      >
        {renameMode ? (
          <div>
            <input
              style={{
                width: "150px",
                outline: "none",
                fontWeight: "bolder",
              }}
              type="text"
              ref={renameRef}
              defaultValue={name}
              onClick={handleRename}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        ) : (
          <h5
            style={{
              maxWidth: "150px",
            }}
          >
            {name}
          </h5>
        )}

        <p style={{ fontSize: "0.7rem" }}>
          Progress: {totalReveal}/{blockers.length}
        </p>
        <IconButton
          sx={{
            color: "#000",
            position: "absolute",
            right: 0,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          onClick={handlePopOver}
          // color="primary"
          aria-label="more options"
          component="span"
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={popOverId}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
              fontSize: "0.9rem",
              cursor: "pointer",
              "& li": {
                display: "flex",
                gap: "10px",
                padding: "1rem",
              },
            }}
          >
            <MenuItem onClick={handleRenameOption}>
              <EditIcon />
              Edit goal name
            </MenuItem>
            {/* <p>Change goal image</p> */}
            <MenuItem onClick={handleDelete}>
              <DeleteIcon />
              Delete
            </MenuItem>
          </Box>
        </Menu>
      </Box>

      {/* Backdrop */}
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "1250",
          display: "flex",
          flexDirection: "column",
        }}
        open={openBackdrop}
        // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default GoalCard;
