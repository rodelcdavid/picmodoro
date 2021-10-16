import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";
import { Container, ImageHolder } from "./Upload.styled";
import placeholder from "../assets/placeholder.jpg";

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
      console.log("hello", file.size);
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
      //focus
    } else if (goalImg === placeholder) {
      alert("Please choose an image first");
    } else {
      setScreenState(1);
    }
  };

  return (
    <div className="page">
      <Container>
        <h1 style={{ marginBottom: "5px" }}>
          <span style={{ color: "#00ADB5" }}>Step 1: </span>What is your goal?
        </h1>
        <TextField
          inputRef={textRef}
          id="outlined-name"
          label="Enter goal name"
          value={goalName}
          onChange={nameHandler}
          style={{ width: "500px", marginBottom: "5px" }}
        />
        <h1 style={{ marginBottom: "5px" }}>
          <span style={{ color: "#00ADB5" }}>Step 2: </span>Upload an image for
          your goal
        </h1>
        <ImageHolder>
          {console.log(goalImg)}
          <img src={goalImg} width="100%" alt="" id="img" className="img" />
        </ImageHolder>

        <input
          style={{
            cursor: "pointer",
            fontSize: "1rem",
            border: "solid 2px black",
            padding: "10px",
            borderRadius: "5px",
            borderWidth: "1px",
            marginRight: "5px",
          }}
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />

        <p style={{ color: "black", fontSize: "0.8rem" }}>Max file size: 5MB</p>

        {/* <input
          placeholder="Enter name of your goal"
          value={goalName}
          onChange={nameHandler}
        /> */}
        <h1>
          <span style={{ color: "#00ADB5" }}>Step 3: </span>Submit and start!
        </h1>
        <Button onClick={onSubmit} variant="contained">
          Submit
        </Button>
      </Container>
    </div>
  );
}
