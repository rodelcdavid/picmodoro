import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  Skeleton,
  TextField,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteGoalAsync, saveSettingsAsync } from "../features/goalSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";

const GoalCard = ({ id, goalName, goalImage, blockers, goal }) => {
  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  const dispatch = useDispatch();

  //preload image
  //TODO: can pass this down as props? or use custom hooks
  const [imagePreloaded, setImagePreloaded] = useState(false);
  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setImagePreloaded(true);
    };
    img.src = goal.image_url;
  }, [goal]);

  //Popover
  const [anchorEl, setAnchorEl] = useState(null);

  //Backdrop
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Edit mode
  const [renameMode, setRenameMode] = useState(false);

  const [selectedGoal, setSelectedGoal] = useState(null);

  //Name
  const [name, setName] = useState(goalName);

  //image url
  const [inputURL, setInputURL] = useState(goalImage);
  const [imgURL, setImgURL] = useState(goalImage);

  //change image dialog
  const [openChangeImage, setOpenChangeImage] = useState(false);

  const handlePopOver = (e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
    setSelectedGoal(goal);
    // e.stopPropagation();
  };

  const handleClose = (e) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  const handleDeleteOption = (e) => {
    e.preventDefault();
    setOpenBackdrop(true);
    dispatch(deleteGoalAsync({ id: id }))
      // .then(() => setOpenBackdrop(false))
      .catch(() =>
        console.log("There was a problem connecting to the server.")
      );
  };

  const renameRef = useRef();

  const handleRenameOption = (e) => {
    e.preventDefault();
    setRenameMode(true);
    setAnchorEl(null);
  };

  const handleBlur = (e) => {
    const inputName = e.target.value;
    setRenameMode(false);
    setName(inputName);
    setSelectedGoal((prev) => {
      return {
        ...prev,
        goal_name: inputName,
      };
    });
  };

  const handleKeyDown = (e) => {
    const inputName = e.target.value;
    if (e.keyCode === 13) {
      setRenameMode(false);
      setName(inputName);
      setSelectedGoal((prev) => {
        return {
          ...prev,
          goal_name: inputName,
        };
      });
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

  const handleChangeImageOption = (e) => {
    e.preventDefault();
    setOpenChangeImage(true);

    setAnchorEl(null);
  };

  const handleSaveChangeImage = () => {
    //TODO: if image is valid
    setImgURL(inputURL);
    setSelectedGoal((prev) => {
      return {
        ...prev,
        image_url: inputURL,
      };
    });

    setOpenChangeImage(false);
  };

  //rerender when goal is included as dep because it always changes
  useEffect(() => {
    if (selectedGoal) {
      if (
        selectedGoal.image_url !== goalImage ||
        selectedGoal.goal_name !== goalName
      ) {
        console.log("to save", selectedGoal);
        dispatch(
          saveSettingsAsync({
            currentGoal: selectedGoal,
            id: selectedGoal.id,
          })
        );
      }
    }

    // }
  }, [dispatch, selectedGoal, goalImage, goalName]);

  const open = Boolean(anchorEl);
  const popOverId = open ? "simple-popover" : undefined;

  return (
    <Box
      sx={{
        width: "200px",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        border: "solid 1px rgba(0,0,0,0.87)",
        borderRadius: "10px",
        overflow: "hidden",
        textDecoration: "none",
        transition: "all ease-in 200ms",

        "&:hover": { boxShadow: "0 3px 10px rgba(0,0,0,0.5)" },
      }}
      component={RouterLink}
      to={`/${id}`}
    >
      {imagePreloaded ? (
        <>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: `url(${imgURL})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          />
          <Box
            sx={{
              color: "rgba(0,0,0,0.87)",
              backgroundColor: "#e5e5e5",
              width: "100%",
              borderTop: "1px solid rgba(0,0,0,0.87)",
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
                  onClick={(e) => e.preventDefault()}
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
                color: "rgba(0,0,0,0.87)",
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
                <MenuItem onClick={handleChangeImageOption}>
                  <LinkIcon />
                  Change image URL
                </MenuItem>
                {/* <p>Change goal image</p> */}
                <MenuItem onClick={handleDeleteOption}>
                  <DeleteIcon />
                  Delete
                </MenuItem>
              </Box>
            </Menu>
          </Box>
        </>
      ) : (
        <>
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            animation="wave"
          />
          <Box
            sx={{
              backgroundColor: "#e5e5e5",
              width: "100%",
              borderTop: "1px solid rgba(0,0,0,0.87)",
              padding: "1rem",
              maxHeight: "50px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              position: "relative",
            }}
          >
            <Skeleton width="150px" animation="wave" />
            <Skeleton width="80px" animation="wave" />
          </Box>
        </>
      )}

      {/* Change image dialog */}
      <Dialog
        open={openChangeImage}
        onClose={(e) => {
          // e.stopPropagation();
          e.preventDefault();
          setOpenChangeImage(false);
        }}
        onBackdropClick={() => setOpenChangeImage(false)}
        fullWidth
      >
        <Box onClick={(e) => e.preventDefault()}>
          <DialogTitle sx={{ bgcolor: "#1976D2", color: "white" }}>
            Change image URL
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                marginTop: "1.5rem",
              }}
            >
              <TextField
                label="Goal Image URL"
                value={inputURL}
                onChange={(e) => setInputURL(e.target.value)}
                fullWidth
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenChangeImage(false)}>Cancel</Button>
            <Button
              onClick={handleSaveChangeImage}
              variant="contained"
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

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
