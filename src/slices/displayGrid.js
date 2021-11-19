import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reveal: [false],
  isDone: false,
};

export const displayGridSlice = createSlice({
  name: "displayGrid",
  initialState,
  reducers: {
    updateReveal: (state, { payload }) => {
      state.reveal = payload;
    },
    toggleIsDone: (state, { payload }) => {
      state.isDone = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateReveal, toggleIsDone } = displayGridSlice.actions;

export default displayGridSlice.reducer;
