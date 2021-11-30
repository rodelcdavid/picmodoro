import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import AddGoalButton from "../components/AddGoalButton";
import GoalCard from "../components/GoalCard";
import Greeting from "../components/Greeting";
import {
  getGoalListAsync,
  resetCurrentGoal,
  resetCurrentGoalStatus,
} from "../features/goalSlice";
import { resetTimerState } from "../features/timerSlice";
import { updateUser } from "../features/userSlice";
import { Wrapper } from "../utils/globalstyles";

const Dashboard = () => {
  const { id, name, email, isUserAuthenticated } = useSelector(
    (state) => state.userState
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getGoalListAsync({ id: id }));
    dispatch(resetCurrentGoal());
    dispatch(resetCurrentGoalStatus());
    // fetchGoals();
  }, [dispatch]);
  const { goalList, fetchStatus } = useSelector((state) => state.goalState); //get from

  //save user to localstorage, should be refreshtoken though
  useEffect(() => {
    localStorage.user = JSON.stringify({
      id,
      name,
      email,
      isUserAuthenticated,
    });
  }, [id, name, email, isUserAuthenticated]);

  const handleLogout = () => {
    dispatch(updateUser({ isUserAuthenticated: false })); //refactor this, what to reset?
    navigate("/home");
  };

  return (
    <Wrapper>
      <h2 style={{ color: "#fff" }}>Dashboard</h2>
      <Greeting name={name} />
      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>

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
