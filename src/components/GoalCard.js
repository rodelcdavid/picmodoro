import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
const GoalCard = ({ id, goalName, goalImage, blockers }) => {
  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;
  return (
    <Box
      sx={{
        width: ["100px", "200px"],
        height: ["100px", "200px"],
        display: "flex",
        flexDirection: "column",
        border: "solid 1px black",
        borderRadius: "10px",
        justifyContent: "flex-end",
        alignItems: "center",
        background: `url(${goalImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        overflow: "hidden",
        textDecoration: "none",
        transition: "all ease-in 200ms",

        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      component={RouterLink}
      to={`/${id}`}
    >
      <Box
        style={{
          color: "#fff",
          backgroundColor: "#1e3c72",
          width: "100%",
          textAlign: "center",
          padding: "1rem",
          maxHeight: "50px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h5>{goalName}</h5>
        <p style={{ fontSize: "0.7rem" }}>
          Progress: {totalReveal}/{blockers.length}
        </p>
      </Box>

      {/* <goalImage src={goalImage} alt="" /> */}
    </Box>
  );
};

export default GoalCard;
