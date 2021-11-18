import { useEffect, useState } from "react";

import placeholder from "./assets/placeholder.jpg";
import { prevImg, prevName, prevScreen } from "./utils/getLocalStorage";
import Upload from "./containers/Upload";
import Pomodoro from "./containers/Pomodoro";
import Heading from "./components/_shared/Heading";

import { useSelector, useDispatch } from "react-redux";
import { updateName, updateImage } from "./slices/goal";

function App() {
  // const [goalImage, setgoalImage] = useState(prevImg || placeholder);
  // const [goalName, setGoalName] = useState(prevName || "");
  const [screenState, setScreenState] = useState(prevScreen || 0);

  const goalName = useSelector((state) => state.goal.name);
  const goalImage = useSelector((state) => state.goal.image);

  //dispatch
  const dispatch = useDispatch();
  const _updateName = (name) => dispatch(updateName(name));
  const _updateImage = (image) => dispatch(updateImage(image));

  useEffect(() => {
    localStorage.imgFile = JSON.stringify(goalImage);
    localStorage.screenState = JSON.stringify(screenState);
    localStorage.goalName = JSON.stringify(goalName);
  }, [goalImage, goalName, screenState]);

  return (
    <>
      <Heading />

      {screenState === 0 ? (
        <Upload
          goalImage={goalImage}
          setGoalImg={_updateImage}
          goalName={goalName}
          setGoalName={_updateName}
          setScreenState={setScreenState}
        />
      ) : (
        <Pomodoro
          goalImage={goalImage}
          goalName={goalName}
          defaultImg={placeholder}
          setGoalImg={_updateImage}
          setGoalName={_updateName}
          setScreenState={setScreenState}
        />
      )}
    </>
  );
}

export default App;
