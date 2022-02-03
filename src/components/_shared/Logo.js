import React from "react";
import { Box } from "@mui/material";
import pomodoro from "../../assets/pomodoro.png";
const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        textShadow: "2px 2px #000",
        fontSize: "2rem",
        fontWeight: "bolder",
        fontFamily: "'Righteous', cursive",
        color: "#fff",
      }}
    >
      PICMODOR
      <Box sx={{ width: "40px" }} component="img" src={pomodoro} alt="" />
    </Box>
  );
};

export default Logo;
