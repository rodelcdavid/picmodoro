import React from "react";
import { ImageHolder } from "./UploadImage.styled";

const UploadImage = ({ goalImg, imageHandler }) => {
  return (
    <div>
      <h1 style={{ marginBottom: "5px" }}>
        <span style={{ color: "#00ADB5" }}>Step 2: </span>Upload an image for
        your goal
      </h1>
      <ImageHolder>
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
    </div>
  );
};

export default UploadImage;
