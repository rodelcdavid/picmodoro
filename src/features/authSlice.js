import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { prevUser } from "../utils/getLocalStorage";

const initialState = {
  //currentUser:{},
  //error:"",
  //isUserAuthenticated:false,
  //loading: false

  id: prevUser.id,
  name: prevUser.name,
  email: prevUser.email,
  isUserAuthenticated: prevUser.isUserAuthenticated,
};

export const authSlice = createSlice({
  name: "user",
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
