// import { Button, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import placeholder from "../assets/placeholder.jpg";
import InputName from "../components/Upload/InputName";
import UploadImage from "../components/Upload/UploadImage";
import SubmitButton from "../components/Upload/SubmitButton";
import { Box } from "@mui/system";

import { useSelector, useDispatch } from "react-redux";
import { updateGoalName, updateGoalImage } from "../slices/goal";

const Upload = ({ setScreenState }) => {
  //Local State
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
      setScreenState(1);
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
        justifyContent: "center",
        width: "100%",
      }}
    >
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
        <InputName
          nameFieldRef={nameFieldRef}
          goalName={goalName}
          nameHandler={nameHandler}
          nameError={nameError}
        />
        <UploadImage
          goalImage={goalImage}
          imageFieldRef={imageFieldRef}
          inputUrl={inputUrl}
          setInputUrl={setInputUrl}
          imageError={imageError}
          loading={loading}
        />
        <SubmitButton onSubmit={onSubmit} loading={loading} />
      </Box>
    </Box>
  );
};

export default Upload;
