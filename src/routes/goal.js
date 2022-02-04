import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Details from "../components/Details";

import { Backdrop, Box, CircularProgress } from "@mui/material";

import ImageGrid from "../components/ImageGrid";

import DisplayTimer from "../components/DisplayTimer";
import UpArrow from "../components/UpArrow";

import { useSelector, useDispatch } from "react-redux";
import { toggleIsDone } from "../features/displayGridSlice";
import GoalSettings from "../components/GoalSettings";
import BackButton from "../components/BackButton";
import { resetTimerState } from "../features/timerSlice";
import { getCurrentGoalAsync, getGoalListAsync } from "../features/goalSlice";

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
      <Box
        sx={{
          height: "calc(100vh - 72px)",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            // display: "grid",
            // gridTemplateRows: "1fr 3fr 1fr",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // width: ["100%", "450px"],
            height: "95%",
            width: "95%",
            margin: "0.5rem auto",
            // border: "solid 2px rgba(0,0,0,0.23)",
            borderRadius: "20px",
            boxShadow: "0 8px 8px rgba(0,0,0,0.5)",
            backgroundColor: "#fff",
            minHeight: "387px",

            "@media (min-width:768px)": {
              minHeight: "600px",
            },

            "@media (min-width:1260px)": {
              minHeight: "500px",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              // width: "350px",
              width: "100%",
              // margin: "0 auto",
              position: "relative",
              height: "15%",
              // background:
              //   "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",

              // borderRadius: "10px",
              color: "#1e3c72",
              padding: "15px",
              borderBottom: "1px solid #1e3c72",
              // boxShadow: "0 5px 10px rgba(0,0,0,0.25)",
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
              height: "85%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              alignItems: "center",

              "@media (min-width:1260px)": {
                flexDirection: "row",

                "& > div": {
                  width: "50%",
                },
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
  //Fix this, nothing is returned if it doesn't match any currentgoalstatus
  return <h1>Loading</h1>;
};

export default Goal;
