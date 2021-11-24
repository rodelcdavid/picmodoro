import { combineReducers } from "redux";
import goalReducer from "./goalSlice";
import screenReducer from "./screenSlice";
import settingsReducer from "./settingsSlice";
import timerReducer from "./timerSlice";
import displayGridReducer from "./displayGridSlice";

const rootReducer = combineReducers({
  goalState: goalReducer,
  screenState: screenReducer,
  settingsState: settingsReducer,
  timerState: timerReducer,
  displayGridState: displayGridReducer,
});

export default rootReducer;
