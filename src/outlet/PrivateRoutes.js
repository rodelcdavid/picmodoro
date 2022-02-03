import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Heading from "../components/_shared/Heading";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isUserAuthenticated } = useSelector((state) => state.authState);

  return isUserAuthenticated ? (
    <>
      <Heading />
      <Outlet />
    </>
  ) : (
    <Navigate to="/signin" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
