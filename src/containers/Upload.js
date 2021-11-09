// import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Container } from "./Upload.styled";
import placeholder from "../assets/placeholder.jpg";
import InputName from "../components/Upload/InputName";
import UploadImage from "../components/Upload/UploadImage";
import SubmitButton from "../components/Upload/SubmitButton";

//change this to just props, then just specify on the children goalName, setGoalName, ...props
export default function Upload({
  goalImg,
  setGoalImg,
  goalName,
  setGoalName,
  setScreenState,
}) {
  const nameHandler = (e) => {
    setGoalName(e.target.value);
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
        setGoalImg(reader.result);
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
    } else if (goalImg === placeholder) {
      alert("Please choose an image first");
    } else {
      setScreenState(1);
    }
  };

  return (
    <Container>
      <InputName
        textRef={textRef}
        goalName={goalName}
        nameHandler={nameHandler}
      />
      <UploadImage goalImg={goalImg} imageHandler={imageHandler} />
      <SubmitButton onSubmit={onSubmit} />
    </Container>
  );
}
