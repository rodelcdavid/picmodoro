import { createSlice } from "@reduxjs/toolkit";
import placeholder from "../assets/placeholder.jpg";
import { prevImg, prevName } from "../utils/getLocalStorage";

const initialState = {
  name: prevName || "",
  image: prevImg || placeholder,
};

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateImage: (state, action) => {
      state.image = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateName, updateImage } = goalSlice.actions;

export default goalSlice.reducer;
