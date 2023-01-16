import React, { useEffect, useRef, useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import placeholder from "../assets/placeholder.jpg";
import { Box } from "@mui/system";
import LoadingButton from "@mui/lab/LoadingButton";

import { useDispatch } from "react-redux";
import {
  Backdrop,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { addGoalAsync } from "../features/asyncActions/goalAsyncActions";

const GoalSetup = () => {
  const [inputUrl, setInputUrl] = useState("");
  const [inputName, setInputName] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  //Selectors

  //Dispatch
  const dispatch = useDispatch();

  //Refs
  const nameFieldRef = useRef();
  const imageFieldRef = useRef();

  //Handlers
  const nameHandler = (e) => {
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
      setLoadingButton(true);
      setOpenBackdrop(true);

      const id = uuidv4();

      dispatch(
        addGoalAsync({
          id: id,
          goalName: inputName,
          goalImage: inputUrl,
        })
      )
        .then(() => {
          setTimeout(() => {
            setOpenBackdrop(false);
            navigate(`/${id}`);
          }, 1000);
        })
        .catch(() =>
          console.log("There was a problem connecting to the server")
        );
    }
  };

  //ComponentDidUpdate
  useEffect(() => {
    setLoading(true);
    const image = new Image();
    image.src = inputUrl;
    image.onload = function () {
      if (this.width > 0) {
        setLoading(false);
        setIsImageValid(true);
        setImageError(false);
      }
    };
    image.onerror = function (e) {
      console.log("error", e);
      setLoading(false);
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
          sx={{ overflow: "auto" }}
          error={imageError ? true : false}
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
        sx={{ alignSelf: "center", width: "40%" }}
        onClick={onSubmit}
        variant="contained"
        component={RouterLink}
        to={`/dashboard`}
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
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default GoalSetup;
