import { useState, useEffect } from "react";
import Details from "../components/Details";

import { Box } from "@mui/material";

import ImageGrid from "../components/ImageGrid";

import NewGoalButton from "../components/NewGoalButton";
import DisplayTimer from "../components/DisplayTimer";
import UpArrow from "../components/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsDone } from "../features/displayGrid";
import SettingsButton from "../components/SettingsButton";

function Main({ defaultImg }) {
  //Local state
  const [guide, setGuide] = useState(true);

  //Selectors
  const { blockers } = useSelector((state) => state.settingsState);

  //Dispatch
  const dispatch = useDispatch();

  //Update if isDone
  //Triggered when you change settings or when timer is finished

  useEffect(() => {
    const reveal = blockers.map((blocker) => blocker.reveal);
    const totalReveal = reveal.filter((bool) => bool === true).length;
    if (totalReveal === blockers.length) {
      // _toggleIsDone(true);
      dispatch(toggleIsDone(true));
    } else {
      // _toggleIsDone(false);
      dispatch(toggleIsDone(false));
    }
  }, [blockers, dispatch]);

  return (
    <Box
      sx={{
        textAlign: "center",
        display: "grid",
        gridTemplateRows: "1fr 3fr 1fr",
        alignItems: "center",
        width: ["100%", "450px"],
        margin: "1rem auto",
        // border: "solid 2px rgba(0,0,0,0.23)",
        borderRadius: "20px",
        boxShadow: "0 10px 15px rgba(0,0,0,0.5)",
        backgroundColor: "#fff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "350px",
          margin: "0 auto",
          position: "relative",
          background:
            "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
          borderRadius: "10px",
          color: "#fff",
          padding: "15px",
          boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
        }}
      >
        <NewGoalButton />
        <Details />
        <SettingsButton setGuide={setGuide} />
        <UpArrow guide={guide ? 1 : 0} />
      </Box>
      <ImageGrid />
      <DisplayTimer />
    </Box>
  );
}

export default Main;
