import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddGoalButton from "../components/AddGoalButton";
import GoalCard from "../components/GoalCard";
import Greeting from "../components/Greeting";
import { getGoalListAsync, resetCurrentGoal } from "../features/goalSlice";
import { resetTimerState } from "../features/timerSlice";
import { Wrapper } from "../utils/globalstyles";

const user = {
  name: "Rodel",
};

const Dashboard = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getGoalListAsync());
    dispatch(resetCurrentGoal());
    // fetchGoals();
  }, [dispatch]);
  const { goalList, fetchStatus } = useSelector((state) => state.goalState); //get from

  return (
    <Wrapper>
      <h2 style={{ color: "#fff" }}>Dashboard</h2>
      <Greeting name={user.name} />

      <Box
        sx={{
          padding: "2rem",
          boxShadow: "0 10px 15px rgba(0,0,0,0.23)",
          backgroundColor: "#fff",
          borderRadius: "5px",
          width: ["20rem", "70rem"],
          height: "30rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          justifyItems: "center",
          gridGap: "30px",
          overflowY: "scroll",
          position: "relative",
          "::-webkit-scrollbar": {
            width: "10px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "::-webkit-scrollbar-thumb:hover": { background: "#555" },
        }}
      >
        {fetchStatus === "fulfilled" ? (
          <>
            <AddGoalButton />
            {goalList.map((goal) => {
              return (
                <GoalCard
                  id={goal.id}
                  goalName={goal.goal_name}
                  goalImage={goal.image_url}
                  blockers={goal.blockers}
                  key={goal.id}
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
    </Wrapper>
  );
};

export default Dashboard;
