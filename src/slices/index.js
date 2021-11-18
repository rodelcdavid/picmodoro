import { combineReducers } from "redux";
import goalReducer from "./goal";
import screenReducer from "./screen";

const rootReducer = combineReducers({
  goalState: goalReducer,
  screenState: screenReducer,
});

export default rootReducer;
