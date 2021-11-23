import React, { useEffect, useRef, useState } from "react";
import placeholder from "../assets/placeholder.jpg";
import { Box } from "@mui/system";

import { useSelector, useDispatch } from "react-redux";
import { updateGoalName, updateGoalImage } from "../features/goal";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { updateScreen } from "../features/screen";

const Form = () => {
  console.log("Form.js");
  const [inputUrl, setInputUrl] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);

  //Selectors
  const { goalName, goalImage } = useSelector((state) => state.goalState);

  //Dispatch
  const dispatch = useDispatch();
  const _updateGoalName = (name) => dispatch(updateGoalName(name));
  const _updateScreen = (value) => dispatch(updateScreen(value));
  // const _updateGoalImage = (image) => dispatch(updateGoalImage(image));

  //Refs
  const nameFieldRef = useRef();
  const imageFieldRef = useRef();

  //Handlers
  const nameHandler = (e) => {
    _updateGoalName(e.target.value); //state should update only onSubmit
  };

  const onSubmit = () => {
    if (!isImageValid) {
      setImageError(true);
      imageFieldRef.current.focus();
    }

    if (!goalName.length) {
      setNameError(true);
      nameFieldRef.current.focus();
    }

    if (goalName.length && isImageValid) {
      _updateScreen(1);
    }
  };

  //ComponentDidUpdate
  useEffect(() => {
    setLoading(true);
    const image = new Image();
    image.src = inputUrl;
    image.onload = function () {
      //need to have spinner before this
      if (this.width > 0) {
        // _updateGoalImage(inputUrl); //state should update only onsubmit
        setLoading(false);
        dispatch(updateGoalImage(inputUrl));
        setIsImageValid(true);
        setImageError(false);
      }
    };
    image.onerror = function () {
      // _updateGoalImage(placeholder);
      setLoading(false);
      dispatch(updateGoalImage(placeholder));
      setIsImageValid(false);
    };

    if (inputUrl.length) {
      setImageError(false);
    }
  }, [inputUrl, dispatch]);

  useEffect(() => {
    if (goalName) {
      setNameError(false);
    }
  }, [goalName]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // width: "calc(100vw - 2rem)",
        width: ["350px", "450px"],
        // maxWidth: "400px",
        padding: "1rem",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        // boxShadow: 3, why is this not working
        borderRadius: "20px",
        marginTop: "1rem",
        backgroundColor: "#fff",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        {/* Input Name */}
        <Typography variant="h6">
          <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
            Step 1:{" "}
          </Box>
          What is your goal?
        </Typography>
        <Box sx={{ width: "100%", alignSelf: "center", marginTop: "5px" }}>
          <TextField
            error={nameError ? true : false}
            className="name-field"
            fullWidth
            inputRef={nameFieldRef}
            id="outlined-name"
            label="Enter goal name"
            value={goalName}
            onChange={nameHandler}
            helperText={
              nameError
                ? "Please enter your goal name."
                : "Ex. Finish Atomic Habits book, Score A+ on Math"
            }
          />
        </Box>

        {/* Upload Image */}
        <Typography variant="h6">
          <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
            Step 2:{" "}
          </Box>
          What image will represent this goal?
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5px",
          }}
        >
          <TextField
            error={imageError ? true : false}
            className="name-field" //can ommit this
            fullWidth
            id="outlined-error-helper-text"
            label="Enter image url"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            helperText={
              imageError
                ? "Please enter a valid image url."
                : "Ex. https://source.unsplash.com/random/300x200"
            }
            inputRef={imageFieldRef}
          />
          {!loading ? (
            <Box
              sx={{
                border: "solid 1px rgba(0,0,0,0.23)",
                width: "100%",
                // maxHeight: "300px",
              }}
              component="img"
              src={goalImage}
              alt=""
            />
          ) : (
            <Box
              sx={{
                border: "solid 1px rgba(0,0,0,0.23)",
                width: "100%",
                height: "200px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
          )}
        </Box>

        {/* Submit Button */}

        <Typography variant="h6">
          <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
            Step 3:{" "}
          </Box>
          Submit and start!
        </Typography>
        <Button
          disabled={loading ? true : false}
          sx={{ alignSelf: "center", width: "60%" }}
          onClick={onSubmit}
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default Form;
