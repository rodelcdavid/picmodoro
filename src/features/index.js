import { combineReducers } from "redux";
import goalReducer from "./goalSlice";
import screenReducer from "./screenSlice";
import settingsReducer from "./settingsSlice";
import timerReducer from "./timerSlice";
import displayGridReducer from "./displayGridSlice";
import userReducer from "./authSlice";

const rootReducer = combineReducers({
  goalState: goalReducer,
  authState: userReducer,
  screenState: screenReducer,
  settingsState: settingsReducer,
  timerState: timerReducer,
  displayGridState: displayGridReducer,
});

export default rootReducer;
