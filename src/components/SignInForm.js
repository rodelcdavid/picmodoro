import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { updateUser } from "../features/userSlice";

const SignInForm = () => {
  //TODO: validate form client side
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:7000/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    console.log(res);
    if (res.ok) {
      const user = await res.json();

      dispatch(
        updateUser({
          id: user.id,
          name: user.name,
          email: user.email,
          isAuthenticated: true,
        })
      );
      //Redirect tp dashboard
      navigate("/dashboard");
    } else {
      alert("Error signing in");
    }
  };

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
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Email address"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        type="password"
        fullWidth
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </TextField>
      <Button
        sx={{ marginTop: "1rem" }}
        to="/dashboard"
        variant="contained"
        component={RouterLink}
        onClick={handleSignIn}
      >
        Sign In
      </Button>
      <Button
        sx={{ marginTop: "5px" }}
        to="/dashboard"
        variant="contained"
        color="warning"
        component={RouterLink}
      >
        Test
      </Button>
      <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
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
