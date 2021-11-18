import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRandom: false,
  presetMin: 25, //set to 25
  numPomodoro: 1,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleIsRandom: (state, { payload }) => {
      state.isRandom = payload;
    },
    updatePresetMin: (state, { payload }) => {
      state.presetMin = payload; //should be state.presetMin += payload , payload should be +-5
    },
    updateNumPomodoro: (state, { payload }) => {
      state.numPomodoro = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggleIsRandom, updatePresetMin, updateNumPomodoro } =
  settingsSlice.actions;

export default settingsSlice.reducer;
