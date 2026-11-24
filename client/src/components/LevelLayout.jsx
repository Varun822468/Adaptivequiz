import { Outlet } from "react-router-dom";
import AppNavbar from "./AppNavbar.jsx";
import { useLevel } from "../context/LevelContext.jsx";

/**
 * Wraps every page of the chosen level. The wrapper class (theme-upsc /
 * theme-foundation) re-maps the colour palette, fonts and radii in index.css,
 * so ALL pages inside follow the same theme and never switch look.
 */
export default function LevelLayout() {
  const { level } = useLevel();
  const cls = level === "upsc" ? "theme-upsc" : "theme-foundation";
  return (
    <div className={`${cls} min-h-screen`}>
      <AppNavbar />
      <Outlet />
    </div>
  );
}
