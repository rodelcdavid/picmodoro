import React from "react";
import { Box } from "@mui/material";

const Heading = () => {
  return (
    <Box
      sx={{
        textAlign: "center",
        width: "100vw",
        backgroundColor: "#1976d2",
        padding: "1rem",
        fontSize: "2rem",
        fontWeight: "bolder",
        color: "#fff",
        textShadow: "2px 2px #000",
        borderBottom: "solid 3px black",
      }}
    >
      PICMODORO
    </Box>
  );
};

export default Heading;
