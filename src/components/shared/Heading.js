import React from "react";
import { Box } from "@mui/material";
import tomato from "../../assets/pnghut_pomodoro-technique-timer-android.png";

const Heading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        backgroundColor: "#1976d2",
        padding: "1rem",
        fontSize: "2.5rem",
        fontWeight: "bolder",
        color: "#fff",
        textShadow: "2px 2px #000",
        borderBottom: "solid 3px black",
        fontFamily: "'Righteous', cursive",
      }}
    >
      <Box
        sx={{ width: "50px", marginRight: "5px" }}
        component="img"
        src={tomato}
        alt=""
      />
      PICMODORO
    </Box>
  );
};

export default Heading;
