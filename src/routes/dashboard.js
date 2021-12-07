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
  updateError,
} from "../features/goalSlice";
import { resetTimerState } from "../features/timerSlice";
import { updateUser } from "../features/authSlice";
import { Wrapper } from "../utils/globalstyles";

const Dashboard = () => {
  const { id, name, email, isUserAuthenticated } = useSelector(
    (state) => state.authState
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGoalListAsync({ id: id })).catch((err) => {
      //should catch be here? make a way so that undefined goallist will still run

      console.log("There was an error"); //the error here is that the goallist in goallistasync fulfilled is undefined
    });
    dispatch(resetCurrentGoal());
    dispatch(resetCurrentGoalStatus());
  }, [dispatch]);
  const { goalList, fetchStatus, error } = useSelector(
    (state) => state.goalState
  );

  const handleLogout = async () => {
    const refreshToken = JSON.parse(localStorage.getItem("refreshToken"));
    const response = await fetch("http://localhost:7000/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: refreshToken,
      }),
    });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      setTimeout(() => {
        dispatch(updateUser({ isUserAuthenticated: false }));
      }, 500);
    }
  };

  return (
    <Wrapper>
      <h2 style={{ color: "#fff" }}>Dashboard</h2>
      <Greeting name={name} />

      <Box
        sx={{
          padding: "3rem 2rem",
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
          //SCROLLBAR BUT NOT FOR MOBILE??
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
        <Button
          onClick={handleLogout}
          variant="outlined"
          sx={{ position: "absolute", right: "0" }}
        >
          Logout
        </Button>
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
