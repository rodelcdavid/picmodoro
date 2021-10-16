import { useEffect, useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Upload from "./components/Upload";
import placeholder from "./assets/placeholder.jpg";

const prevImg = JSON.parse(localStorage.getItem("imgFile")) || placeholder;
const prevScreen = JSON.parse(localStorage.getItem("screenState")) || 0;
const prevName = JSON.parse(localStorage.getItem("goalName")) || "";

function App() {
  const [goalImg, setGoalImg] = useState(prevImg);
  const [goalName, setGoalName] = useState(prevName);
  const [screenState, setScreenState] = useState(prevScreen);

  useEffect(() => {
    localStorage.imgFile = JSON.stringify(goalImg);
    localStorage.screenState = JSON.stringify(screenState);
    localStorage.goalName = JSON.stringify(goalName);
  }, [goalImg, goalName, screenState]);

  if (screenState === 0) {
    return (
      <Upload
        goalImg={goalImg}
        setGoalImg={setGoalImg}
        goalName={goalName}
        setGoalName={setGoalName}
        setScreenState={setScreenState}
      />
    );
  } else {
    return (
      <Pomodoro
        goalImg={goalImg}
        goalName={goalName}
        defaultImg={placeholder}
        setGoalImg={setGoalImg}
        setGoalName={setGoalName}
        setScreenState={setScreenState}
      />
    );
  }
}

export default App;
