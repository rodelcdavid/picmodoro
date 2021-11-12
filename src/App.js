import { useEffect, useState } from "react";

import placeholder from "./assets/placeholder.jpg";
import { prevImg, prevName, prevScreen } from "./utils/getLocalStorage";
import Upload from "./containers/Upload";
import Pomodoro from "./containers/Pomodoro";
import Heading from "./components/shared/Heading";

function App() {
  const [goalImg, setGoalImg] = useState(prevImg || placeholder);
  const [goalName, setGoalName] = useState(prevName || "");
  const [screenState, setScreenState] = useState(prevScreen || 0);

  useEffect(() => {
    localStorage.imgFile = JSON.stringify(goalImg);
    localStorage.screenState = JSON.stringify(screenState);
    localStorage.goalName = JSON.stringify(goalName);
  }, [goalImg, goalName, screenState]);

  return (
    <>
      <Heading />
      {screenState === 0 ? (
        <Upload
          goalImg={goalImg}
          setGoalImg={setGoalImg}
          goalName={goalName}
          setGoalName={setGoalName}
          setScreenState={setScreenState}
        />
      ) : (
        <Pomodoro
          goalImg={goalImg}
          goalName={goalName}
          defaultImg={placeholder}
          setGoalImg={setGoalImg}
          setGoalName={setGoalName}
          setScreenState={setScreenState}
        />
      )}
    </>
  );
  // if (screenState === 0) {
  //   return (
  //     <Upload
  //       goalImg={goalImg}
  //       setGoalImg={setGoalImg}
  //       goalName={goalName}
  //       setGoalName={setGoalName}
  //       setScreenState={setScreenState}
  //     />
  //   );
  // } else {
  //   return (
  //     <Pomodoro
  //       goalImg={goalImg}
  //       goalName={goalName}
  //       defaultImg={placeholder}
  //       setGoalImg={setGoalImg}
  //       setGoalName={setGoalName}
  //       setScreenState={setScreenState}
  //     />
  //   );
  // }
}

export default App;
