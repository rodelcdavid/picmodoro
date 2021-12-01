import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const PublicRoutes = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isUserAuthenticated } = useSelector((state) => state.authState);
  //   console.log("authLogin", authLogin);

  return !isUserAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/dashboard" replace state={{ from: location }} />
  );
};

export default PublicRoutes;
