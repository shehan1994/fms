import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ children, requiredLevel }) {
  const { user, token } = useSelector((state) => state.auth);
  console.log("user of prot", user);

  // Check if user exists and has appropriate access
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Allow access based on user level and required level
  if (user.level === "1" || (user.level === "2" && requiredLevel >= 2) || (user.level === "3" && requiredLevel >= 3)) {
    return children;
  }

  // Redirect if access is denied
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
