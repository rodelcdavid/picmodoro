import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  minutes: 0,
  seconds: 0,
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
    resetTimerState: (state, { payload }) => {
      state.minutes = 0;
      state.seconds = 0;
      state.isActive = false;
      state.isSessionDone = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateMinutes,
  updateSeconds,
  toggleIsActive,
  toggleIsSessionDone,
  resetTimerState,
} = timerSlice.actions;

export default timerSlice.reducer;
