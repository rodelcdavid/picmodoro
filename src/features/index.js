import { combineReducers } from "redux";
import goalReducer from "./goalSlice";
import timerReducer from "./timerSlice";
import displayGridReducer from "./displayGridSlice";
import userReducer from "./authSlice";

const rootReducer = combineReducers({
  goalState: goalReducer,
  authState: userReducer,
  timerState: timerReducer,
  displayGridState: displayGridReducer,
});

export default rootReducer;
