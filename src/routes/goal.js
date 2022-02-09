import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Details from "../components/Details";

import { Backdrop, Box, CircularProgress } from "@mui/material";

import ImageGrid from "../components/ImageGrid";

import DisplayTimer from "../components/DisplayTimer";
import UpArrow from "../components/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsDone } from "../features/displayGridSlice";
import GoalSettings from "../components/GoalSettings";
import BackButton from "../components/BackButton";
import { getCurrentGoalAsync } from "../features/goalSlice";

const Goal = () => {
  console.log("Goal parent component");
  let urlParams = useParams();
  const goalIdParam = urlParams.goalid;

  //Fetch state from server
  //  base on goalid, get state from redux for now base on goalid
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
    //if accessToken is invalid, set userauthenticated to false => signin

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
          console.log("toggle done true");
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

  //Update if isDone
  //Triggered when you change settings or when timer is finished
  //you can just put this as a local state
  //TODO: Update database when isDone

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
            borderBottom: "1px solid rgba(0,0,0,0.87)",
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

            "::-webkit-scrollbar": {
              width: "10px",
            },
            "::-webkit-scrollbar-thumb": {
              background: "#888",
              // borderRadius: "10px",
            },
            "::-webkit-scrollbar-thumb:hover": { background: "#555" },
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
            {/* TODO: Move this logic to imagegrid */}
            <Box>
              <ImageGrid currentGoal={currentGoal} />
            </Box>
            <Box
            // sx={{
            //   padding: "0.5rem 3rem",
            //   border: "1px solid rgba(0,0,0,0.87)",
            //   // borderRadius: "10px",
            //   width: "476px",
            // }}
            >
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
  //Fix this, nothing is returned if it doesn't match any currentgoalstatus
  return <h1>Loading</h1>;
};

export default Goal;
