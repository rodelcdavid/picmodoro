import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { updateUser } from "../features/authSlice";

const RegisterForm = () => {
  //TODO: validate form client side
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      console.log("res", res);
      if (res.ok) {
        const user = await res.json();
        dispatch(
          updateUser({
            id: user.id,
            name: user.name,
            email: user.email,
            isUserAuthenticated: true,
          })
        );
        //Redirect to dashboard
        navigate("/dashboard");
      } else {
        alert(await res.json());
      }
    } catch {
      alert("There was a problem registering.");
      return;
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
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Name"
        onChange={(e) => setName(e.target.value)}
      />
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
        onClick={handleRegister}
      >
        Register
      </Button>
      <p style={{ fontSize: "0.8rem", marginTop: "10px" }}>
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
