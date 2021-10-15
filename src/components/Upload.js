import { Button, TextField } from "@mui/material";
import React from "react";
import { Container, ImageHolder } from "./Upload.styled";

export default function Upload({
  goalImg,
  goalName,
  imageHandler,
  nameHandler,
  onSubmit,
  textRef,
}) {
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

        <p style={{ color: "red" }}>Max file size: 5MB</p>

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
