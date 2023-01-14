import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import pomodoro from "../../assets/pomodoro.png";
import { Link as RouterLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { updateUser } from "../../features/authSlice";
import Logo from "./Logo";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

const Heading = () => {
  const { name } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const response = await fetch("http://localhost:7000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setTimeout(() => {
        dispatch(updateUser({ isUserAuthenticated: false }));
        setAnchorEl(null);
      }, 500);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopOver = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClosePopOver = (e) => {
    setAnchorEl(null);
  };

  const openPopOver = Boolean(anchorEl);
  const popOverId = openPopOver ? "simple-popover" : undefined;

  const largeScreen = useMediaQuery("(min-width:580px");

  return (
    <Box
      sx={{
        display: "flex",
        padding: "1rem",

        width: "100%",
        height: "72px",
        color: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.23)",
        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
        // position: "fixed",
      }}
    >
      <Box
        sx={{ textDecoration: "none" }}
        component={RouterLink}
        to="/dashboard"
      >
        {largeScreen ? (
          <Logo />
        ) : (
          <Box sx={{ width: "40px" }} component="img" src={pomodoro} alt="" />
        )}
      </Box>
      <Box
        sx={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={handlePopOver}
      >
        <Typography>{name}</Typography>
        <IconButton sx={{ color: "#fff" }}>
          <ArrowDropDownIcon />
        </IconButton>
      </Box>
      <Menu
        id={popOverId}
        open={openPopOver}
        anchorEl={anchorEl}
        onClose={handleClosePopOver}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            fontSize: "0.9rem",
            cursor: "pointer",

            "& li": {
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "1rem",
            },
          }}
        >
          <MenuItem>
            <HelpIcon />
            Help
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            Logout
          </MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};

export default Heading;
