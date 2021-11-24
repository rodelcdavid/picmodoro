import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
const GoalCard = ({ id, title, img }) => {
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
        background: `url(${img})`,
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
      <h4
        style={{
          color: "#fff",
          backgroundColor: "#1e3c72",
          width: "100%",
          textAlign: "center",
          padding: "1rem",
          maxHeight: "50px",
        }}
      >
        {title}
      </h4>
      {/* <img src={img} alt="" /> */}
    </Box>
  );
};

export default GoalCard;
