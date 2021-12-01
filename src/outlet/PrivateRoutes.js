import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isUserAuthenticated } = useSelector((state) => state.authState);
  //   console.log("authLogin", authLogin);

  return isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
