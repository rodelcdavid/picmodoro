import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

import { Backdrop, Box, CircularProgress } from "@mui/material";

import ImageGrid from "../components/ImageGrid";

import DisplayTimer from "../components/DisplayTimer";
import UpArrow from "../components/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsDone } from "../features/slices/displayGridSlice";
import GoalSettings from "../components/GoalSettings";
import BackButton from "../components/BackButton";
import { getCurrentGoalAsync } from "../features/asyncActions/goalAsyncActions";
// import { getCurrentGoalAsync } from "../features/goalSlice";

const Goal = () => {
  let urlParams = useParams();
  const goalIdParam = urlParams.goalid;

  //Local state
  const [guide, setGuide] = useState(true);

  //Dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentGoalAsync({ id: goalIdParam })).catch(() =>
      console.log("There was a problem connecting to the server")
    );
  }, [dispatch, goalIdParam]);
  const { currentGoal, currentGoalStatus } = useSelector(
    (state) => state.goalState
  );

  const { blockers } = currentGoal;

  useEffect(() => {
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
  }, [blockers, dispatch, currentGoal]);

  if (currentGoalStatus === "pending") {
    return (
      <>
        <Backdrop
          sx={{
            color: "rgba(0,0,0,0.87)",
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

  if (currentGoalStatus === "not found") {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          height: "100%",
        }}
      >
        <h3>Goal not found</h3>
      </Box>
    );
  }

  //can omit if statement for fulfilled
  if (currentGoalStatus === "fulfilled") {
    return (
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            textAlign: "center",
            width: "100%",
            position: "relative",
            height: "75px",
            color: "#1e3c72",
            padding: "15px",
            // borderBottom: "1px solid rgba(0,0,0,0.87)",
            // boxShadow: "0px 3px 5px rgba(0,0,0,0.5)",
            borderBottom: "1px solid rgba(0,0,0,0.2)",
          }}
        >
          <BackButton />
          <Details currentGoal={currentGoal} />
          <GoalSettings
            setGuide={setGuide}
            currentGoal={currentGoal}
            goalIdParam={goalIdParam}
          />
          <UpArrow guide={guide ? 1 : 0} />
        </Box>
        <Box
          sx={{
            height: "calc(100vh - 147px)",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              height: "100%",
              minHeight: "300px",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-evenly",

              "@media (min-width:580px)": {
                minHeight: "450px",
              },
            }}
          >
            <Box>
              <ImageGrid currentGoal={currentGoal} />
            </Box>
            <Box>
              <DisplayTimer
                currentGoal={currentGoal}
                goalIdParam={goalIdParam}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  return <h1>Loading</h1>;
};

export default Goal;
