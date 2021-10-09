import { useEffect, useState } from "react";
import Pomodoro from "./components/Pomodoro";
import Upload from "./components/Upload";
import placeholder from "./assets/placeholder.jpg";

function App() {
  const defaultImg = placeholder;
  const [goalImg, setGoalImg] = useState(defaultImg);
  const [screenState, setScreenState] = useState(0);

  useEffect(() => {
    const prevImg = JSON.parse(localStorage.getItem("imgFile")) || defaultImg;
    const prevScreen = JSON.parse(localStorage.getItem("screenState")) || 0;
    setGoalImg(prevImg);
    setScreenState(prevScreen);
  }, []);

  useEffect(() => {
    localStorage.imgFile = JSON.stringify(goalImg);
    localStorage.screenState = JSON.stringify(screenState);
  }, [goalImg, screenState]);

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
        imageHandler={imageHandler}
        setScreenState={setScreenState}
        onSubmit={onSubmit}
      />
    );
  } else {
    return (
      <Pomodoro
        goalImg={goalImg}
        defaultImg={defaultImg}
        setGoalImg={setGoalImg}
        setScreenState={setScreenState}
      />
    );
  }
}

export default App;
