import { TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const UploadImage = ({
  goalImage,
  imageFieldRef,
  inputUrl,
  setInputUrl,
  imageError,
}) => {
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
          error={imageError ? true : false}
          className="name-field" //can ommit this
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
        <Box
          sx={{
            border: "solid 1px rgba(0,0,0,0.23)",
            width: "100%",
            // maxHeight: "300px",
          }}
          component="img"
          src={goalImage}
          alt=""
        />
      </Box>
    </Box>
  );
};

export default UploadImage;
