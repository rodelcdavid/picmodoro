import { combineReducers } from "redux";
import goalReducer from "./goal";
import screenReducer from "./screen";
import settingsReducer from "./settings";
import timerReducer from "./timer";
import displayGridReducer from "./displayGrid";

const rootReducer = combineReducers({
  goalState: goalReducer,
  screenState: screenReducer,
  settingsState: settingsReducer,
  timerState: timerReducer,
  displayGridState: displayGridReducer,
});

export default rootReducer;
