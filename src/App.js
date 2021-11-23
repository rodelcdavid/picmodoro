import { useEffect } from "react";

// import Pomodoro from "./containers/Pomodoro";
import Heading from "./components/_shared/Heading";

import { useSelector } from "react-redux";

import SetupForm from "./views/SetupForm";
import Main from "./views/Main";

function App() {
  //Selectors

  const { goalName, goalImage } = useSelector((state) => state.goalState);

  const screenState = useSelector((state) => state.screenState.value);

  useEffect(() => {
    // move this to Upload and Pomodoro container
    localStorage.imgFile = JSON.stringify(goalImage);
    localStorage.screenState = JSON.stringify(screenState);
    localStorage.goalName = JSON.stringify(goalName);
  }, [goalImage, goalName, screenState]);

  return (
    <>
      <Heading />

      {screenState === 0 ? <SetupForm /> : <Main />}
    </>
  );
}

export default App;
