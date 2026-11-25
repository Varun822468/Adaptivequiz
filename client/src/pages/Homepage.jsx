import { useLevel } from "../context/LevelContext.jsx";
import HomeFoundation from "./HomeFoundation.jsx";
import HomeUpsc from "./HomeUpsc.jsx";

// Each level has its own home screen and design.
export default function Homepage() {
  const { level } = useLevel();
  return level === "upsc" ? <HomeUpsc /> : <HomeFoundation />;
}
