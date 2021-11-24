import { Button } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Wrapper } from "../utils/globalstyles";

const Home = () => {
  return (
    <Wrapper>
      <h2>Home</h2>
      <img src="https://source.unsplash.com/random/400x200" alt="" />
      <p style={{ marginTop: "2rem", width: "500px", textAlign: "center" }}>
        Amet eu quis elit ea enim nisi in nulla sit. Dolore nisi ipsum deserunt
        proident et sint. Aliquip duis fugiat do magna ut duis nulla elit ea ea
        nulla. Non nulla eiusmod laboris enim cillum.
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "2rem",
          width: "200px",
        }}
      >
        <Button
          component={RouterLink}
          variant="contained"
          color="success"
          to="/signin"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          Sign In
        </Button>
        <Button
          component={RouterLink}
          variant="contained"
          color="warning"
          to="/register"
          style={{ textDecoration: "none", color: "#fff", marginTop: "5px" }}
        >
          Register
        </Button>
      </div>
    </Wrapper>
  );
};

export default Home;
