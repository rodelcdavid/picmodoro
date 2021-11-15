import { Box } from "@mui/system";
import React from "react";

const Details = ({ goalName, computeReveal, numPomodoro }) => {
  return (
    <Box sx={{ width: "80%" }}>
      <h3>{goalName}</h3>

      {/* should grab totalReveal instead of calling computereveal */}
      <p style={{ color: "green", fontSize: "0.8rem" }}>
        Progress: {computeReveal()}/{numPomodoro}
      </p>
    </Box>
  );
};

export default Details;
