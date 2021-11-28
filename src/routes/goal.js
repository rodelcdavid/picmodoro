import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

import { Backdrop, Box, CircularProgress } from "@mui/material";

import ImageGrid from "../components/ImageGrid";

import DisplayTimer from "../components/DisplayTimer";
import UpArrow from "../components/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsDone } from "../features/displayGridSlice";
import SettingsButton from "../components/SettingsButton";
import BackButton from "../components/BackButton";
import { resetTimerState } from "../features/timerSlice";
import { getCurrentGoalAsync, getGoalListAsync } from "../features/goalSlice";

const Goal = () => {
  console.log("Goal parent component");
  let urlParams = useParams();
  const goalIdParam = urlParams.goalid;

  //Fetch state from server base on goalid, get state from redux for now base on goalid
  // const { goalList } = useSelector((state) => state.goalState);

  //can i pass this down as props?
  //or useSelector each component and just props goalidparam
  //should i put all the state in just one goalList array
  // const currentGoal = goalList.find((goal) => {
  //   return goal.id === goalIdParam;
  // });

  //Local state
  //this should be included in redux
  const [guide, setGuide] = useState(true);

  //Selectors
  // const { blockers } = useSelector((state) => state.settingsState);
  //Dispatch
  const dispatch = useDispatch();

  //FIXME: Error on refresh, currentGoal is undefined
  useEffect(() => {
    console.log("useffect triggered");
    dispatch(getCurrentGoalAsync({ id: goalIdParam }));
  }, [dispatch]);
  const { currentGoal } = useSelector((state) => state.goalState);

  const { blockers } = currentGoal;

  useEffect(() => {
    console.log("useEffect triggered hereeeeee");
    if (Object.keys(currentGoal).length) {
      if (blockers.length) {
        const reveal = blockers.map((blocker) => blocker.reveal);
        const totalReveal = reveal.filter((bool) => bool === true).length;
        if (totalReveal === blockers.length) {
          dispatch(toggleIsDone(true));
        } else {
          dispatch(toggleIsDone(false));
        }

        //Toggle arrow guide
        if (blockers.length > 1) {
          setGuide(false);
        }
      }
    }
  }, [blockers, dispatch]);

  //Update if isDone
  //Triggered when you change settings or when timer is finished
  //you can just put this as a local state
  //TODO: Update database when isDone

  if (Object.keys(currentGoal).length) {
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
          {/* <NewGoalButton /> */}
          <BackButton />
          <Details currentGoal={currentGoal} />
          <SettingsButton
            setGuide={setGuide}
            currentGoal={currentGoal}
            goalIdParam={goalIdParam}
          />
          <UpArrow guide={guide ? 1 : 0} />
        </Box>
        <ImageGrid currentGoal={currentGoal} />
        <DisplayTimer currentGoal={currentGoal} goalIdParam={goalIdParam} />
      </Box>
    );
  } else {
    return (
      <>
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: "1250",
            display: "flex",
            flexDirection: "column",
          }}
          open
        >
          <h2>Loading goal...</h2>
          <br />
          <CircularProgress color="inherit" />
        </Backdrop>
      </>
    );
  }
};

export default Goal;
