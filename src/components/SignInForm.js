import { TextField, Button, Typography, Snackbar, Alert } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { updateError, updateUser } from "../features/slices/authSlice";
import Logo from "./_shared/Logo";
import { signInAsync } from "../features/asyncActions/authAsyncActions";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const { error } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const handleTest = (e) => {
    e.preventDefault();
  };

  const handleSignIn = (e, type) => {
    e.preventDefault();

    let inputEmail, inputPassword;

    /* User login or tester */
    if (type === "user") {
      inputEmail = email;
      inputPassword = password;
      dispatch(
        signInAsync({
          email: inputEmail,
          password: inputPassword,
        })
      );
      // signIn(inputEmail, inputPassword);
    } else {
      // setError(false);
      dispatch(updateError(""));
      inputEmail = "awesometester@test.com";
      inputPassword = "tester";
      setEmail(inputEmail);
      setPassword(inputPassword);
      setOpenSnackbar(true);
      setTimeout(() => {
        dispatch(
          signInAsync({
            email: inputEmail,
            password: inputPassword,
          })
        );
        // signIn(inputEmail, inputPassword);
      }, 2000);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        minHeight: "520px",

        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",

        "@media (min-width:950px)": {
          flexDirection: "row",
          minHeight: "400px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "320px",
          gap: "20px",
          alignItems: "center",

          "& h6": {
            textAlign: "center",
          },

          "@media (min-width: 950px)": {
            width: "30rem",
            alignItems: "flex-start",

            "& h6": {
              textAlign: "left",
            },
          },
        }}
      >
        <Logo />
        <Typography variant="h6" sx={{ color: "#e5e5e5" }}>
          Be inspired with your goals and be productive with Picmodoro.
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "90%",
          maxWidth: "400px",
          backgroundColor: "#fff",
          boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
          padding: "2rem",
          borderRadius: "10px",

          "@media (min-width:950px)": {},
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1976D2" }}>Sign In</h2>
        {error === "Wrong Credentials" && (
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignIn(e, "user");
            }
          }}
        />
        <TextField
          sx={{ marginTop: "10px" }}
          type="password"
          fullWidth
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSignIn(e, "user");
            }
          }}
        >
          Password
        </TextField>

        <Button
          sx={{ marginTop: "1rem" }}
          to="/dashboard"
          variant="contained"
          component={RouterLink}
          onClick={(e) => handleSignIn(e, "user")}
        >
          Sign In
        </Button>
        <Button
          sx={{ marginTop: "5px" }}
          to="/dashboard"
          variant="contained"
          color="warning"
          component={RouterLink}
          onClick={(e) => handleSignIn(e, "tester")}
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
      <Snackbar
        open={openSnackbar}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert variant="filled" severity="success" sx={{ width: "100%" }}>
          Welcome and happy testing!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignInForm;
