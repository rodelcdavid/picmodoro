import { configureStore } from "@reduxjs/toolkit";
import goalReducer from "../slices/goal";

export default configureStore({
  reducer: {
    goal: goalReducer,
  },
});
