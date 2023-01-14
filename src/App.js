import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import Goal from "./routes/goal";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./routes/signin";
import Register from "./routes/register";
import Dashboard from "./routes/dashboard";
import NotFound from "./components/_shared/NotFound";
import PrivateRoutes from "./outlet/PrivateRoutes";
import PublicRoutes from "./outlet/PublicRoutes";

import { updateUser } from "./features/authSlice";
import { updateError } from "./features/goalSlice";
import Footer from "./components/_shared/Footer";

function App() {
  //Selectors

  const { goalList, error } = useSelector((state) => state.goalState);
  const { id, name, email, isUserAuthenticated } = useSelector(
    (state) => state.authState
  );

  const dispatch = useDispatch();

  //goallist localstorage might not be necessary
  useEffect(() => {
    localStorage.goalList = JSON.stringify(goalList.data);
  }, [goalList.data]);

  //should be refreshtoken
  useEffect(() => {
    localStorage.auth = JSON.stringify({
      id,
      name,
      email,
      isUserAuthenticated,
    });
  }, [id, name, email, isUserAuthenticated]);

  useEffect(() => {
    if (error === "Invalid token") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(updateError(""));
      setTimeout(() => {
        dispatch(updateUser({ isUserAuthenticated: false }));
      }, 500);
      alert("Please relogin.");
    }
  }, [dispatch, error]);

  //wake up heroku server on componentdidmount
  useEffect(() => {
    fetch("http://localhost:7000/")
      .then((res) => res.json())
      .then(console.log());
  }, []);

  //change dashboard route to /:userid/dashboard
  //change goal route to /:userid/:goalid
  //!add browserrouter basename for github pages
  return (
    <>
      {/* <BrowserRouter basename="/picmodoro"> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            exact
            element={
              isUserAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />
            }
          />
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/:goalid" element={<Goal />} />
          </Route>

          <Route element={<PublicRoutes />}>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
