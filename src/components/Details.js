import { Box } from "@mui/system";
import React from "react";

const Details = ({ currentGoal }) => {
  const { goal_name: goalName, blockers } = currentGoal;

  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  return (
    <Box
      sx={{
        color: "rgba(0,0,0,0.87)",
        justifySelf: "center",

        "& h3": {
          fontSize: goalName.length > 10 ? "1rem" : "1.2rem",
        },

        "@media (min-width:580px)": {
          "& h3": {
            fontSize: "1.2rem",
          },
        },
      }}
    >
      <h3 style={{}}>{goalName}</h3>
      <p
        style={{
          fontSize: "0.7rem",
          marginTop: "5px",
        }}
      >
        Progress: {totalReveal}/{blockers.length}
      </p>
    </Box>
  );
};

export default Details;
