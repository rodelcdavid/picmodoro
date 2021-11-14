import { Box } from "@mui/system";
import React from "react";

const Details = ({ goalName, computeReveal, numPomodoro }) => {
  return (
    <Box>
      <h2>{goalName}</h2>

      {/* should grab totalReveal instead of calling computereveal */}
      <p style={{ color: "green" }}>
        Progress: {computeReveal()}/{numPomodoro}
      </p>
    </Box>
  );
};

export default Details;
