import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const RegisterForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "400px",
        backgroundColor: "#fff",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        padding: "2rem",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <TextField sx={{ marginTop: "10px" }} fullWidth label="Name" />
      <TextField sx={{ marginTop: "10px" }} fullWidth label="Email address" />
      <TextField
        sx={{ marginTop: "10px" }}
        type="password"
        fullWidth
        label="Password"
      />

      <TextField
        sx={{ marginTop: "10px" }}
        type="password"
        fullWidth
        label="Confirm password"
      />
      <Button
        sx={{ marginTop: "1rem" }}
        to="/dashboard"
        variant="contained"
        component={RouterLink}
      >
        Register
      </Button>
      <p style={{ marginTop: "5px" }}>
        Already have an account?{" "}
        <Box
          sx={{
            textDecoration: "none",
            color: "#1976D2",
            fontWeight: "bolder",
          }}
          component={RouterLink}
          to="/signin"
        >
          SIGN IN
        </Box>
      </p>
    </Box>
  );
};

export default RegisterForm;
