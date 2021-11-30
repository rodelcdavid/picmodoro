import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { prevUser } from "../utils/getLocalStorage";

const initialState = {
  id: prevUser.id,
  name: prevUser.name,
  email: prevUser.email,
  isUserAuthenticated: prevUser.isUserAuthenticated,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.id = payload.id;
      state.name = payload.name;
      state.email = payload.email;
    },
    updateIsUserAuthenticated: (state, { payload }) => {
      state.isUserAuthenticated = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
