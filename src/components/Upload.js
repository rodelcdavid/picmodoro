import { TextField } from "@mui/material";
import React from "react";
import { Container, ImageHolder } from "./Upload.styled";

export default function Upload({
  goalImg,
  goalName,
  imageHandler,
  nameHandler,
  onSubmit,
}) {
  return (
    <div className="page">
      <Container>
        <h1 className="heading">Add your Image</h1>
        <ImageHolder>
          {console.log(goalImg)}
          <img src={goalImg} width="100%" alt="" id="img" className="img" />
        </ImageHolder>

        <input
          style={{
            border: "solid 2px black",
            padding: "2px",
            marginRight: "5px",
          }}
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
        />

        <p>Max file size: 5MB</p>
        <TextField
          id="outlined-name"
          label="Enter goal name"
          value={goalName}
          onChange={nameHandler}
        />
        {/* <input
          placeholder="Enter name of your goal"
          value={goalName}
          onChange={nameHandler}
        /> */}
        <button onClick={onSubmit}>Submit</button>
      </Container>
    </div>
  );
}
