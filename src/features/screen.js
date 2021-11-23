import { createSlice } from "@reduxjs/toolkit";
import { prevScreen } from "../utils/getLocalStorage";

const initialState = {
  value: prevScreen || 0,
};

export const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    updateScreen: (state, { payload }) => {
      state.value = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateScreen } = screenSlice.actions;

export default screenSlice.reducer;
