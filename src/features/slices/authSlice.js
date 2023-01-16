import { createSlice } from "@reduxjs/toolkit";
import { prevAuth } from "../../utils/getLocalStorage";
// import { signInAsync } from "../asyncActions/authAsyncActions";

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

  // extraReducers: (builder) => {
  //   // getGoalListAsync
  //   builder.addCase(signInAsync.fulfilled, (state, { payload }) => {
  //     state.id = payload.id;
  //     state.name = payload.name;
  //     state.email = payload.email;
  //     state.isUserAuthenticated = payload.isUserAuthenticated;
  //   });
  // },
});

// Action creators are generated for each case reducer function
export const { updateUser, updateIsUserAuthenticated } = authSlice.actions;

export default authSlice.reducer;
