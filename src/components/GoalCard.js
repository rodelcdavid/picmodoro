import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Divider, IconButton, Popover } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteGoal, deleteGoalAsync } from "../features/goalSlice";

const GoalCard = ({ id, goalName, goalImage, blockers }) => {
  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  const dispatch = useDispatch();

  //Popover
  const [anchorEl, setAnchorEl] = useState(null);

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
    dispatch(deleteGoalAsync({ id: id }));
  };

  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: ["100px", "200px"],
        height: ["100px", "200px"],
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
        <h5>{goalName}</h5>

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
            <p>Edit goal name</p>
            <p>Change image url</p>
            <p onClick={handleDelete}>Delete</p>
          </Box>
        </Popover>
      </Box>

      {/* <goalImage src={goalImage} alt="" /> */}
    </Box>
  );
};

export default GoalCard;
