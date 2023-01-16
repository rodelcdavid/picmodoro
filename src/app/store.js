import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../features/slices";

export default configureStore({
  reducer: rootReducer,
});
