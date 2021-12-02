import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import placeholder from "../assets/placeholder.jpg";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

import { useSelector, useDispatch } from "react-redux";
import {
  // updateGoalName,
  // updateGoalImage,
  addGoal,
  addGoalAsync,
} from "../features/goalSlice";
import {
  Backdrop,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { updateScreen } from "../features/screenSlice";

const GoalSetup = () => {
  console.log("Form.js");
  const [inputUrl, setInputUrl] = useState("");
  const [inputName, setInputName] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Selectors
  const { goalName, goalImage } = useSelector((state) => state.goalState);
  const { goalList, addStatus } = useSelector((state) => state.goalState);
  const { id: ownerId } = useSelector((state) => state.authState);
  //Dispatch
  const dispatch = useDispatch();
  // const _updateGoalName = (name) => dispatch(updateGoalName(name));
  // const _updateScreen = (value) => dispatch(updateScreen(value));
  // const _updateGoalImage = (image) => dispatch(updateGoalImage(image));

  //Refs
  const nameFieldRef = useRef();
  const imageFieldRef = useRef();

  //Handlers
  const nameHandler = (e) => {
    // _updateGoalName(e.target.value); //state should update only onSubmit
    setInputName(e.target.value);
  };

  let navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    if (!isImageValid) {
      setImageError(true);
      imageFieldRef.current.focus();
    }

    if (!inputName.length) {
      setNameError(true);
      nameFieldRef.current.focus();
    }

    if (inputName.length && isImageValid) {
      // _updateScreen(1);
      //add new goal action
      setLoadingButton(true);
      setOpenBackdrop(true);

      const id = uuidv4();

      dispatch(
        addGoalAsync({
          ownerId: ownerId,
          id: id,
          goalName: inputName,
          goalImage: inputUrl,
        })
      )
        .then(() =>
          setTimeout(() => {
            setOpenBackdrop(false);
            navigate(`/${id}`);
          }, 1000)
        )
        .catch(() =>
          console.log("There was a problem connecting to the server")
        );

      // if (status === "fulfilled") {
      //   console.log("addstatus", status);

      //   navigate(`/${id}`);
      // }
      // setTimeout(() => {
      //   navigate(`/${id}`);
      // }, 1000);

      //navigate goal id if fulfilled
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
        // dispatch(updateGoalImage(inputUrl));
        setIsImageValid(true);
        setImageError(false);
      }
    };
    image.onerror = function (e) {
      console.log("error", e);
      // _updateGoalImage(placeholder);
      setLoading(false);
      // dispatch(updateGoalImage(placeholder));
      setIsImageValid(false);
    };

    if (inputUrl.length) {
      setImageError(false);
    }
  }, [inputUrl]);

  useEffect(() => {
    if (inputName.length) {
      setNameError(false);
    }
  }, [inputName]);

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
        // padding: "0.5rem",
        // boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        // boxShadow: 3, why is this not working
        // borderRadius: "20px",
        // marginTop: "1rem",
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
            value={inputName}
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
              src={isImageValid ? inputUrl : placeholder}
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
        <LoadingButton
          loading={loading || loadingButton ? true : false}
          loadingPosition="start"
          sx={{ alignSelf: "center", width: "40%" }}
          onClick={onSubmit}
          variant="contained"
          component={RouterLink}
          to={`/dashboard`} //! change to id
        >
          Submit
        </LoadingButton>
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
    </Box>
  );
};

export default GoalSetup;
