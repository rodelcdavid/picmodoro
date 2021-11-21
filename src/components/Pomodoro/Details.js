import { Box } from "@mui/system";
import React from "react";

const Details = ({ goalName, blockers }) => {
  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  return (
    <Box sx={{ width: "80%" }}>
      <h3>{goalName}</h3>
      <p style={{ color: "green", fontSize: "0.8rem" }}>
        Progress: {totalReveal}/{blockers.length}
      </p>
    </Box>
  );
};

export default Details;
