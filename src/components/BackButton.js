import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
const BackButton = () => {
  const navigate = useNavigate();
  const { isActive } = useSelector((state) => state.timerState);
  return (
    <Box
      sx={{
        marginRight: "auto",
        boxShadow: "0 5px 5px rgba(0,0,0,0.5)",
        borderRadius: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Tooltip title="Back to dashboard">
        <IconButton
          disabled={isActive ? true : false}
          onClick={() => {
            navigate("/dashboard");
          }}
          color="primary"
          aria-label="back picture"
          component="span"
        >
          <ArrowBackIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BackButton;
