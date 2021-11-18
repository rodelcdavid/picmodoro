import { createSlice } from "@reduxjs/toolkit";

import { prevImg, prevName } from "../utils/getLocalStorage";

const initialState = {
  goalName: prevName,
  goalImage: prevImg,
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    updateGoalName: (state, { payload }) => {
      state.goalName = payload;
    },
    updateGoalImage: (state, { payload }) => {
      state.goalImage = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateGoalName, updateGoalImage } = goalSlice.actions;

export default goalSlice.reducer;
