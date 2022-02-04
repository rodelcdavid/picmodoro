import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Details = ({ currentGoal }) => {
  // const { goalList } = useSelector((state) => state.goalState);

  // const currentGoal = goalList.filter((goal) => {
  //   return goal.id === goalIdParam;
  // });

  // const { goalName, blockers } = currentGoal[0];
  const { goal_name: goalName, blockers } = currentGoal;

  //Selectors
  // const { goalName } = useSelector((state) => state.goalState);

  // const { blockers } = useSelector((state) => state.settingsState);

  const reveal = blockers.map((blocker) => blocker.reveal);
  const totalReveal = reveal.filter((bool) => bool === true).length;

  console.log("Details Component");
  return (
    <Box
      sx={{
        // width: "100%",
        // margin: "0 auto",
        justifySelf: "center",
      }}
    >
      <h3 style={{ fontSize: goalName.length > 10 ? "1rem" : "1.5rem" }}>
        {goalName}
      </h3>
      <p
        style={{
          color: "#2a5298",
          fontSize: "0.7rem",
          // fontWeight: "bolder",
          marginTop: "5px",
        }}
      >
        Progress: {totalReveal}/{blockers.length}
      </p>
    </Box>
  );
};

export default Details;
