import { CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddGoalButton from "../components/AddGoalButton";
import GoalCard from "../components/GoalCard";
import {
  getGoalListAsync,
  resetCurrentGoal,
  resetCurrentGoalStatus,
} from "../features/goalSlice";

const Dashboard = () => {
  const { id } = useSelector((state) => state.authState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("dashboard useeffect");
    dispatch(getGoalListAsync({ id: id })).catch((err) => {
      //should catch be here? make a way so that undefined goallist will still run

      console.log("There was an error"); //the error here is that the goallist in goallistasync fulfilled is undefined
    });
    dispatch(resetCurrentGoal());
    dispatch(resetCurrentGoalStatus());
  }, [dispatch, id]);
  const { goalList } = useSelector((state) => state.goalState);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        alignItems: "center",
        // padding: "0.5rem",
        // marginTop: "0.5rem",
        height: "100%",
      }}
    >
      <Typography
        variant="h6"
        fontWeight="800"
        sx={{
          color: "rgba(0,0,0,0.87)",
          width: "100%",
          padding: "0.5rem",
          borderBottom: "1px solid rgba(0,0,0,0.87)",
          height: "75px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Dashboard
      </Typography>

      <Box
        sx={{
          padding: "1.5rem",

          height: "calc(100vh - 147px)",

          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          justifyItems: "center",
          gridGap: "30px",
          overflowY: "scroll",
          position: "relative",
        }}
      >
        {goalList.status === "fulfilled" ? (
          <>
            <AddGoalButton />
            {goalList.data.map((goal) => {
              return (
                <GoalCard
                  id={goal.id}
                  goalName={goal.goal_name}
                  goalImage={goal.image_url}
                  blockers={goal.blockers}
                  key={goal.id}
                  goal={goal}
                  // can just prop drill the currentgoal
                />
              );
            })}
          </>
        ) : (
          <CircularProgress
            sx={{
              position: "absolute",
              top: "calc((100% / 2) - 1rem)",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
