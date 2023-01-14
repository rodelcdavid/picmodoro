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
    dispatch(getGoalListAsync({ id: id })).catch((err) => {
      console.log("There was an error");
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
        alignItems: "center",
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
          border: "1px solid rgba(0,0,0,0.2)",
          // borderBottom: "1px solid rgba(0,0,0,0.87)",
          // boxShadow: "0px 3px 5px rgba(0,0,0,0.5)",

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
          padding: "1rem 1.5rem",

          height: "calc(100vh - 147px)",

          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          justifyItems: "center",
          gridGap: "25px",
          overflowY: "auto",
          position: "relative",

          "&::-webkit-scrollbar": {
            height: "7px",
            width: "7px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
          },
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
