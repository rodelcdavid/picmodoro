import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const UploadImage = ({ goalImage, imageHandler }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
    >
      <Typography variant="h6">
        <Box sx={{ color: "#4EC127", fontWeight: "bolder" }} component="span">
          Step 2:{" "}
        </Box>
        Upload an image for your goal.
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            border: "solid 1px rgba(0,0,0,0.23)",
            width: "100%",
          }}
          component="img"
          src={goalImage}
          alt=""
        />

        <input
          type="file"
          accept="image/*"
          name="image-upload"
          id="input"
          onChange={imageHandler}
          style={{
            width: "100%",
            cursor: "pointer",
            border: "solid 1px rgba(0,0,0,0.23)",
            padding: "10px",
            borderRadius: "5px",
            borderWidth: "1px",
            marginTop: "5px",
          }}
        />

        <Typography
          sx={{ display: "inline-block", color: "black", fontSize: "0.8rem" }}
          paragraph
        >
          Max file size: 5MB
        </Typography>
      </Box>
    </Box>
  );
};

export default UploadImage;
