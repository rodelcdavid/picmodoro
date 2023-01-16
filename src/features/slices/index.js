import { combineReducers } from "redux";
import goalReducer from "./goalSlice";
import timerReducer from "./timerSlice";
import displayGridReducer from "./displayGridSlice";
import authReducer from "./authSlice";

const rootReducer = combineReducers({
  goalState: goalReducer,
  authState: authReducer,
  timerState: timerReducer,
  displayGridState: displayGridReducer,
});

export default rootReducer;
