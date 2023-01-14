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
        justifySelf: "flex-start",
        borderRadius: "100%",
      }}
    >
      <Tooltip title="Back to dashboard">
        <IconButton
          sx={{ color: "rgba(0,0,0,0.87)" }}
          disabled={isActive ? true : false}
          onClick={() => {
            navigate("/dashboard");
          }}
          color="primary"
          aria-label="back picture"
          component="span"
        >
          <ArrowBackIcon sx={{ color: "#284E91" }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default BackButton;
