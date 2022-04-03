import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const userID = sessionStorage.getItem("userID");
  const location = useLocation();

  return (
    (userID)
      ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;