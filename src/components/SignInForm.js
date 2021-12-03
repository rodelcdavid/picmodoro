import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { updateUser } from "../features/authSlice";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let location = useLocation();
  // let from = location.state?.from?.pathname || "/dashboard";

  const handleTest = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: 1,
        name: "Tester",
        email: "tester@gmail.com",
        isUserAuthenticated: true,
      })
    );
    navigate("/dashboard");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:7000/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.ok) {
        const { user, accessToken, refreshToken } = await res.json();
        setError(false);
        dispatch(
          updateUser({
            id: user.id,
            name: user.name,
            email: user.email,
            isUserAuthenticated: true,
          })
        );
        localStorage.accessToken = JSON.stringify(accessToken);
        localStorage.refreshToken = JSON.stringify(refreshToken);
        // console.log("TOKENS IN SIGNIN", accessToken, refreshToken);
        //Redirect to dashboard
        // navigate(from, { replace: true });
        navigate("/dashboard");
      } else {
        // alert(await res.json());
        setError(true);
      }
    } catch {
      alert("There was a problem connecting to the server.");
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
      <h2 style={{ textAlign: "center", color: "#1976D2" }}>Sign In</h2>
      {error && (
        <Box
          style={{
            color: "black",
            textAlign: "center",
            padding: "0.5rem",
            marginTop: "1rem",
            border: "solid 1px red",
            backgroundColor: "seashell",
            fontSize: "0.8rem",
          }}
        >
          Email and password combination is incorrect. Please try again.
        </Box>
      )}
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
        onClick={handleTest}
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
