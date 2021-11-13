import React from "react";
import { Box } from "@mui/material";
import tomato from "../../assets/pnghut_pomodoro-technique-timer-android.png";

const Heading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",

        padding: "1rem",
        fontSize: "2rem",
        fontWeight: "bolder",
        color: "#fff",
        textShadow: "2px 2px #000",
        borderBottom: "solid 2px black",
        fontFamily: "'Righteous', cursive",
        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
      }}
    >
      PICMODOR
      <Box sx={{ width: "40px" }} component="img" src={tomato} alt="" />
    </Box>
  );
};

export default Heading;
