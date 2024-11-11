import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, requiredLevel }) {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (user.level === "1" || (user.level === "2" && requiredLevel >= 2) || (user.level === "3" && requiredLevel >= 3)) {
    return children;
  }

  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
