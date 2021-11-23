import { Box } from "@mui/system";
import React from "react";
import Form from "../components/Form";

const SetupForm = ({ setScreenState }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Form setScreenState={setScreenState} />
    </Box>
  );
};

export default SetupForm;
