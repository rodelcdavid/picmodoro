import { createSlice } from "@reduxjs/toolkit";
import { prevAuth } from "../utils/getLocalStorage";

const initialState = {
  id: prevAuth.id,
  name: prevAuth.name,
  email: prevAuth.email,
  isUserAuthenticated: prevAuth.isUserAuthenticated,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
      state.isUserAuthenticated = payload.isUserAuthenticated;
    },
    updateIsUserAuthenticated: (state, { payload }) => {
      state.isUserAuthenticated = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateIsUserAuthenticated } = authSlice.actions;

export default authSlice.reducer;
