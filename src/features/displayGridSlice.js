import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDone: false,
};

export const displayGridSlice = createSlice({
  name: "displayGrid",
  initialState,
  reducers: {
    toggleIsDone: (state, { payload }) => {
      state.isDone = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsDone } = displayGridSlice.actions;

export default displayGridSlice.reducer;
