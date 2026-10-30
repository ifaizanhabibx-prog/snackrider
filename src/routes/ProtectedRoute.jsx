import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  // After successful login

  return <Outlet />;
}

export default ProtectedRoute;
