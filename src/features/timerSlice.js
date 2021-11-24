import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minutes: 0, //can use reselect or thunk middleware to access presetMin state
  seconds: 0, //set to 25
  isActive: false,
  isSessionDone: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    updateMinutes: (state, { payload }) => {
      state.minutes = payload;
    },
    updateSeconds: (state, { payload }) => {
      state.seconds = payload;
    },
    toggleIsActive: (state, { payload }) => {
      state.isActive = payload;
    },
    toggleIsSessionDone: (state, { payload }) => {
      state.isSessionDone = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateMinutes,
  updateSeconds,
  toggleIsActive,
  toggleIsSessionDone,
} = timerSlice.actions;

export default timerSlice.reducer;
