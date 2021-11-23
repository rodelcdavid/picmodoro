import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

const Details = () => {
  //Selectors
  const { goalName } = useSelector((state) => state.goalState);

  const { blockers } = useSelector((state) => state.settingsState);

  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  console.log("Details Component");
  return (
    <Box
      sx={{
        width: "80%",
      }}
    >
      <h3 style={{ fontSize: goalName.length > 10 ? "1rem" : "1.5rem" }}>
        {goalName}
      </h3>
      <p
        style={{
          color: "#fff",
          fontSize: "0.7rem",
          fontWeight: "bolder",
          marginTop: "5px",
        }}
      >
        Progress: {totalReveal}/{blockers.length}
      </p>
    </Box>
  );
};

export default Details;
