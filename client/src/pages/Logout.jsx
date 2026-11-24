import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLevel } from "../context/LevelContext.jsx";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { clearLevel } = useLevel();

  useEffect(() => {
    logout();
    clearLevel();
    navigate("/user/auth", { replace: true });
  }, [logout, clearLevel, navigate]);

  return null;
}
