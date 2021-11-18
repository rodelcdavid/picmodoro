import { combineReducers } from "redux";
import goalReducer from "./goal";
import screenReducer from "./screen";
import settingsReducer from "./settings";

const rootReducer = combineReducers({
  goalState: goalReducer,
  screenState: screenReducer,
  settingsState: settingsReducer,
});

export default rootReducer;
