import { TextField, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { updateUser } from "../features/slices/authSlice";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { registerAsync } from "../features/asyncActions/authAsyncActions";
import api from "../api/picmodoroApi";

//Validation
const schema = yup.object({
  name: yup.string().required("This field is required."),
  email: yup
    .string()
    .email("Invalid email address.")
    .required("This field is required.")
    .test(
      "Unique Email",
      "Email already in use.", // <- key, message
      async (email) => {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await fetch(`${api}/check/${email}`);
            if (res.ok) {
              resolve(true);
            } else {
              resolve(false);
            }
          } catch {
            alert("There was a problem connecting to the server.");
            return;
          }
        });
      }
    ),
  password: yup.string().required("This field is required."),
  passwordConfirmation: yup
    .string()
    .test("passwords-match", "Passwords must match.", function (value) {
      return this.parent.password === value;
    })
    .required("This field is required."),
});

const RegisterForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const onRegister = async (data) => {
    if (data) {
      const { name, email, password } = data;
      dispatch(registerAsync({ name, email, password }));
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        minHeight: "520px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
      }}
    >
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
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1976D2" }}>Register</h2>

        <form onSubmit={handleSubmit(onRegister)}>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: "5px" }}
                fullWidth
                id="outlined-error-helper-text-name"
                label="Name *"
                error={errors.name ? true : false}
                helperText={errors.name?.message || " "}
              />
            )}
            name="name"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: "5px" }}
                fullWidth
                id="outlined-error-helper-text-email"
                label="Email address *"
                error={errors.email ? true : false}
                helperText={errors.email?.message || " "}
              />
            )}
            name="email"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: "5px" }}
                fullWidth
                type="password"
                id="outlined-error-helper-text-password"
                label="Password *"
                error={errors.password ? true : false}
                helperText={errors.password?.message || " "}
              />
            )}
            name="password"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                sx={{ marginTop: "5px" }}
                fullWidth
                type="password"
                id="outlined-error-helper-text-confirm"
                label="Confirm password *"
                error={errors?.passwordConfirmation ? true : false}
                helperText={errors.passwordConfirmation?.message || " "}
              />
            )}
            name="passwordConfirmation"
            control={control}
            defaultValue=""
            className="materialUIInput"
          />
          <Button
            type="submit"
            sx={{ marginTop: "0.2rem", width: "100%" }}
            variant="contained"
          >
            Register
          </Button>
        </form>

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
    </Box>
  );
};

export default RegisterForm;
