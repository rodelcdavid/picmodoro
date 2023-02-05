import { createSlice } from "@reduxjs/toolkit";
import { prevAuth } from "../../utils/getLocalStorage";
import {
  logoutAsync,
  registerAsync,
  signInAsync,
} from "../asyncActions/authAsyncActions";

const initialState = {
  id: prevAuth.id,
  name: prevAuth.name,
  email: prevAuth.email,
  isUserAuthenticated: prevAuth.isUserAuthenticated,
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      console.log(payload);
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.isUserAuthenticated = payload.isUserAuthenticated;
    },
    updateIsUserAuthenticated: (state, { payload }) => {
      state.isUserAuthenticated = payload;
    },
    updateError: (state, { payload }) => {
      state.error = payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(signInAsync.fulfilled, (state, { payload }) => {
      const { id, name, email } = payload.user;
      //casereducer to call another reducer
      authSlice.caseReducers.updateUser(state, {
        payload: {
          id,
          name,
          email,
          isUserAuthenticated: true,
        },
      });
      state.error = "";
      localStorage.accessToken = JSON.stringify(payload.accessToken);
      localStorage.refreshToken = JSON.stringify(payload.refreshToken);
    });

    builder.addCase(signInAsync.rejected, (state, { payload }) => {
      state.error = "Wrong Credentials";
    });

    builder.addCase(registerAsync.fulfilled, (state, { payload }) => {
      const { id, name, email } = payload.user;
      //casereducer to call another reducer
      authSlice.caseReducers.updateUser(state, {
        payload: {
          id,
          name,
          email,
          isUserAuthenticated: true,
        },
      });
      state.error = "";
      localStorage.accessToken = JSON.stringify(payload.accessToken);
      localStorage.refreshToken = JSON.stringify(payload.refreshToken);
    });

    builder.addCase(logoutAsync.fulfilled, (state, { payload }) => {
      //casereducer to call another reducer
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      //settimeout triggers error
      // setTimeout(() => {
      authSlice.caseReducers.updateUser(state, {
        payload: {
          // id: "",
          // name: "",
          // email: "",
          isUserAuthenticated: false,
        },
      });
      // }, 500);
    });
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateIsUserAuthenticated, updateError } =
  authSlice.actions;

export default authSlice.reducer;
