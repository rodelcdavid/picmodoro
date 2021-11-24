import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const SignInForm = () => {
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
      <h2 style={{ textAlign: "center" }}>Sign In</h2>
      <TextField sx={{ marginTop: "10px" }} fullWidth label="Email address" />
      <TextField
        sx={{ marginTop: "10px" }}
        type="password"
        fullWidth
        label="Password"
      >
        Password
      </TextField>
      <Button
        sx={{ marginTop: "1rem" }}
        to="/dashboard"
        variant="contained"
        component={RouterLink}
      >
        Sign In
      </Button>
      <p style={{ marginTop: "5px" }}>
        Don't have an account?{" "}
        <Box
          sx={{
            textDecoration: "none",
            color: "#1976D2",
            fontWeight: "bolder",
          }}
          component={RouterLink}
          to="/register"
        >
          REGISTER
        </Box>
      </p>
    </Box>
  );
};

export default SignInForm;
