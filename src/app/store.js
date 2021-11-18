import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slices";
import goalReducer from "../slices/goal";
import screenReducer from "../slices/screen";

export default configureStore({
  reducer: rootReducer,
});
