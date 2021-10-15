import { useEffect, useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Upload from "./components/Upload";
import placeholder from "./assets/placeholder.jpg";

function App() {
  const defaultImg = placeholder;
  const [goalImg, setGoalImg] = useState(defaultImg);
  const [goalName, setGoalName] = useState("");
  const [screenState, setScreenState] = useState(0);

  useEffect(() => {
    const prevImg = JSON.parse(localStorage.getItem("imgFile")) || defaultImg;
    const prevScreen = JSON.parse(localStorage.getItem("screenState")) || 0;
    const prevName = JSON.parse(localStorage.getItem("goalName") || "");
    setGoalName(prevName);
    setGoalImg(prevImg);
    setScreenState(prevScreen);
  }, [defaultImg]);

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
    //error on empty file, reproduce the error by choosing large file >> alert will pop >> choose file then close without choosing

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

    if (file && file.type.match("image.*")) {
      reader.readAsDataURL(file);
    } else {
      alert("Please choose a valid image file");
    }
  };

  const onSubmit = () => {
    if (goalImg === defaultImg) {
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
      />
    );
  } else {
    return (
      <Pomodoro
        goalImg={goalImg}
        goalName={goalName}
        defaultImg={defaultImg}
        setGoalImg={setGoalImg}
        setGoalName={setGoalName}
        setScreenState={setScreenState}
      />
    );
  }
}

export default App;
