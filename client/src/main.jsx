import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LevelProvider } from "./context/LevelContext.jsx";
import { StudyToolsProvider } from "./components/StudyToolsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <LevelProvider>
        <StudyToolsProvider>
          <App />
        </StudyToolsProvider>
      </LevelProvider>
    </BrowserRouter>
  </AuthProvider>
);
