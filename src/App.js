import { useEffect, useRef, useState } from "react";
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

  const nameHandler = (e) => {
    setGoalName(e.target.value);
  };
  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      console.log("hello", file.size);
      if (file.size > 5000000) {
        alert("File size limit reached");
        return;
      }
      if (reader.readyState === 2) {
        setGoalImg(reader.result);
      } else {
        return <h1>Loading</h1>;
      }
    };

    if (file) {
      if (file.type.match("image.*")) {
        reader.readAsDataURL(file);
      } else {
        alert("Please choose a valid image file");
      }
    }
  };

  const textRef = useRef();

  const onSubmit = () => {
    if (!goalName) {
      alert("Please enter name for your goal");
      textRef.current.focus();
      //focus
    } else if (goalImg === placeholder) {
      alert("Please choose an image first");
    } else {
      setScreenState(1);
    }
  };

  if (screenState === 0) {
    return (
      <Upload
        goalImg={goalImg}
        goalName={goalName}
        imageHandler={imageHandler}
        nameHandler={nameHandler}
        setScreenState={setScreenState}
        onSubmit={onSubmit}
        textRef={textRef}
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
