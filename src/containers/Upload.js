// import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import placeholder from "../assets/placeholder.jpg";
import InputName from "../components/Upload/InputName";
import UploadImage from "../components/Upload/UploadImage";
import SubmitButton from "../components/Upload/SubmitButton";
import { Box } from "@mui/system";

import { useSelector, useDispatch } from "react-redux";
import { updateName, updateImage } from "../slices/goal";

//change this to just props, then just specify on the children goalName, setGoalName, ...props
// export default function Upload({
//   goalImage,
//   setGoalImg,
//   goalName,
//   setGoalName,
//   setScreenState,
// })

const Upload = ({ setScreenState }) => {
  // //Selectors
  const goalName = useSelector((state) => state.goalState.name);
  const goalImage = useSelector((state) => state.goalState.image);
  // //Dispatch
  const dispatch = useDispatch();
  const _updateName = (name) => dispatch(updateName(name));
  const _updateImage = (image) => dispatch(updateImage(image));

  const nameHandler = (e) => {
    _updateName(e.target.value);
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      // console.log("hello", file.size);
      if (file.size > 5000000) {
        alert("File size limit reached");
        return;
      }
      if (reader.readyState === 2) {
        _updateImage(reader.result);
      } else {
        return <h1>Loading</h1>;
      }
    };

    if (file) {
      if (file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        alert("Please choose a valid image file");
      }
    }
  };

  const textRef = useRef();

  const onSubmit = () => {
    if (!goalName) {
      alert("Please enter name for your goal");
      textRef.current.focus();
    } else if (goalImage === placeholder) {
      alert("Please choose an image first");
    } else {
      setScreenState(1);
    }
  };

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
          width: "calc(100vw - 2rem)",
          maxWidth: "400px",
          padding: "1rem",
          boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
          borderRadius: "20px",
          marginTop: "1rem",
          backgroundColor: "#F6F5F5",
        }}
      >
        <InputName
          textRef={textRef}
          goalName={goalName}
          nameHandler={nameHandler}
        />
        <UploadImage goalImage={goalImage} imageHandler={imageHandler} />
        <SubmitButton onSubmit={onSubmit} />
      </Box>
    </Box>
  );
};

export default Upload;
