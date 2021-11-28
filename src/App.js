import { useEffect } from "react";

import Heading from "./components/_shared/Heading";

import { useSelector } from "react-redux";

import Goal from "./routes/goal";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/home";
import SignIn from "./routes/signin";
import Register from "./routes/register";
import Dashboard from "./routes/dashboard";

function App() {
  //Selectors

  const { goalList } = useSelector((state) => state.goalState);

  //TODO: TRY NOT USING LOCALSTORAGE
  useEffect(() => {
    localStorage.goalList = JSON.stringify(goalList);
  }, [goalList]);

  //change dashboard route to /:userid/dashboard
  //change goal route to /:userid/:goalid
  return (
    <>
      <BrowserRouter basename="/picmodoro">
        <Heading />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:goalid" element={<Goal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
