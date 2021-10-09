import React from "react";
import { Container, ImageHolder } from "./Upload.styled";

export default function Upload({ goalImg, imageHandler, onSubmit }) {
  return (
    <div className="page">
      <Container>
        <h1 className="heading">Add your Image</h1>
        <ImageHolder>
          {console.log(goalImg)}
          <img src={goalImg} width="100%" alt="" id="img" className="img" />
        </ImageHolder>
        <div style={{ display: "flex" }}>
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
          <button onClick={onSubmit}>Submit</button>
        </div>

        <p>Max file size: 5MB</p>
      </Container>
    </div>
  );
}
