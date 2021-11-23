import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isRandom: false,
  presetMin: 0.1, //set to 25

  blockers: [
    {
      clickable: false,
      reveal: false,
    },
  ],
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

    updateBlockers: (state, { payload }) => {
      state.blockers = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleIsRandom,
  updatePresetMin,

  updateBlockers,
} = settingsSlice.actions;

export default settingsSlice.reducer;
