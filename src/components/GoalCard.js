import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Backdrop,
  CircularProgress,
  Divider,
  IconButton,
  Popover,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  deleteGoal,
  deleteGoalAsync,
  saveNameAsync,
} from "../features/goalSlice";

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
  useEffect(() => {
    dispatch(saveNameAsync({ id: id, goalName: name }));
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
        border: "solid 1px black",
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

        "&:hover": { boxShadow: "0 10px 15px rgba(0,0,0,0.5)" },
      }}
      component={RouterLink}
      to={`/${id}`}
    >
      <Box
        style={{
          color: "#fff",
          backgroundColor: "#1e3c72",
          width: "100%",

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
            color: "#fff",
            position: "absolute",
            right: 0,
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.2)",
            },
          }}
          onClick={handlePopOver}
          color="primary"
          aria-label="more options"
          component="span"
        >
          <MoreVertIcon />
        </IconButton>
        <Popover
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

              cursor: "pointer",
              "& p": {
                padding: "1rem",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.23)",
                },
              },
            }}
          >
            <p onClick={handleRenameOption}>Edit goal name</p>
            <p>Change image url</p>
            <p onClick={handleDelete}>Delete</p>
          </Box>
        </Popover>
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
