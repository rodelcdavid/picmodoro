import { useEffect } from "react";

import Heading from "./components/_shared/Heading";

import { useSelector } from "react-redux";

import Goal from "./routes/goal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./routes/home";
import SignIn from "./routes/signin";
import Register from "./routes/register";
import Dashboard from "./routes/dashboard";
import NotFound from "./components/_shared/NotFound";
import PrivateRoutes from "./outlet/PrivateRoutes";
import PublicRoutes from "./outlet/PublicRoutes";

function App() {
  //Selectors

  const { goalList } = useSelector((state) => state.goalState);

  //TODO: TRY NOT USING LOCALSTORAGE
  useEffect(() => {
    localStorage.goalList = JSON.stringify(goalList);
  }, [goalList]);

  const { isUserAuthenticated } = useSelector((state) => state.authState);

  //change dashboard route to /:userid/dashboard
  //change goal route to /:userid/:goalid
  return (
    <>
      <BrowserRouter basename="/picmodoro">
        <Heading />
        {/* <Routes>
          <Route
            path="/"
            exact
            element={
              isUserAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route path="/home" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/:goalid" element={<Goal />} />
          <Route path="*" element={<NotFound />} />
        </Routes> */}

        <Routes>
          <Route
            path="/"
            exact
            element={
              isUserAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:goalid" element={<Goal />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
