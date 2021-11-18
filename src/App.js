import { useEffect } from "react";

import placeholder from "./assets/placeholder.jpg";

import Upload from "./containers/Upload";
import Pomodoro from "./containers/Pomodoro";
import Heading from "./components/_shared/Heading";

import { useSelector, useDispatch } from "react-redux";
import { updateScreen } from "./slices/screen";

function App() {
  // const [goalImage, setgoalImage] = useState(prevImg || placeholder);
  // const [goalName, setGoalName] = useState(prevName || "");
  // const [screenState, setScreenState] = useState(prevScreen || 0);

  //Selectors

  const { goalName, goalImage } = useSelector((state) => state.goalState);
  // const goalName = useSelector((state) => state.goalState.name);
  // const goalImage = useSelector((state) => state.goalState.image);
  const screenState = useSelector((state) => state.screenState.value);

  //Dispatch
  const dispatch = useDispatch();
  const _updateScreen = (value) => dispatch(updateScreen(value));

  useEffect(() => {
    // move this to Upload and Pomodoro container
    localStorage.imgFile = JSON.stringify(goalImage);
    localStorage.screenState = JSON.stringify(screenState);
    localStorage.goalName = JSON.stringify(goalName);
  }, [goalImage, goalName, screenState]);

  return (
    <>
      <Heading />

      {screenState === 0 ? (
        <Upload setScreenState={_updateScreen} />
      ) : (
        <Pomodoro defaultImg={placeholder} setScreenState={_updateScreen} />
      )}
    </>
  );
}

export default App;
