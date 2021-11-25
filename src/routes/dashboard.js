import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddGoalButton from "../components/AddGoalButton";
import GoalCard from "../components/GoalCard";
import Greeting from "../components/Greeting";
import { Wrapper } from "../utils/globalstyles";

// const goalList = [
//   {
//     id: 1,
//     title: "Eiffel Tower",
//     img: "https://source.unsplash.com/random/300x200",
//   },
//   {
//     id: 2,
//     title: "Finish Homework",
//     img: "https://source.unsplash.com/random/300x201",
//   },
//   {
//     id: 3,
//     title: "Ace Math Exam",
//     img: "https://source.unsplash.com/random/300x202",
//   },
//   {
//     id: 4,
//     title: "Ace Math Exam",
//     img: "https://source.unsplash.com/random/300x203",
//   },
//   {
//     id: 5,
//     title: "Ace Math Exam",
//     img: "https://source.unsplash.com/random/300x204",
//   },
// ];

const user = {
  name: "Rodel",
};

const Dashboard = () => {
  const { goalList } = useSelector((state) => state.goalState);
  const reverseGoalList = [...goalList].reverse();
  return (
    <Wrapper>
      <h2 style={{ color: "#fff" }}>Dashboard</h2>
      <Greeting name={user.name} />

      <Box
        sx={{
          padding: "2rem",
          boxShadow: "0 10px 15px rgba(0,0,0,0.23)",
          backgroundColor: "#fff",
          borderRadius: "10px",
          width: ["20rem", "70rem"],
          height: "30rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          justifyItems: "center",
          gridGap: "30px",
          overflowY: "scroll",
        }}
      >
        <AddGoalButton />
        {reverseGoalList.map((goal) => {
          return (
            <GoalCard
              id={goal.id}
              goalName={goal.goalName}
              goalImage={goal.goalImage}
              blockers={goal.blockers}
              key={goal.id}
            />
          );
        })}
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
