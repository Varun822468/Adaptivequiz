import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLevel } from "../context/LevelContext.jsx";

/**
 * level (optional): "foundation" | "upsc" -> route only for that level.
 * Without `level` the route is shared (still needs a level to be chosen,
 * unless `skipLevel` is set, e.g. the level picker itself).
 */
const ProtectedRoute = ({ children, level: required, skipLevel = false }) => {
  const { token, loading } = useAuth();
  const { level } = useLevel();
  const location = useLocation();

  if (loading) return null; // or a spinner

  if (!token) {
    return <Navigate to="/user/auth" replace state={{ from: location }} />;
  }
  if (!skipLevel && (!level || (required && level !== required))) {
    return <Navigate to="/level" replace />;
  }
  return children;
};

export default ProtectedRoute;
