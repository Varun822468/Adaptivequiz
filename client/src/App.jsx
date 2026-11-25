import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Assessment from "./pages/assessment";
import Auth from "./pages/auth";
import Practice from "./pages/practice";
import ProtectedRoute from "./pages/ProtectedRoute";
import Logout from "./pages/Logout.jsx";
import Profile from "./pages/Profile.jsx";
import Results from "./pages/Results.jsx";
import ResultDetail from "./pages/ResultDetail.jsx";
import MixedPractice from "./pages/MixedPractice.jsx";
import DifficultPractice from "./pages/DifficultPractice.jsx";
import AssessmentSelection from "./pages/AssessmentSelection.jsx";
import AdaptiveAssess from "./pages/AdaptiveAssess.jsx";
import UpscHub from "./pages/UpscHub.jsx";
import UpscPractice from "./pages/UpscPractice.jsx";
import DailyChallenge from "./pages/DailyChallenge.jsx";
import SyllabusTracker from "./pages/SyllabusTracker.jsx";
import Resources from "./pages/Resources.jsx";
import UpscAssessment from "./pages/UpscAssessment.jsx";
import LevelSelect from "./pages/LevelSelect.jsx";
import LevelLayout from "./components/LevelLayout.jsx";
import StudyTools from "./components/StudyTools.jsx";

function App() {
  return (
    <>
    <Routes>
      {/* Auth Page (always accessible) */}
      <Route path="/user/auth" element={<Auth />} />
      <Route path="/logout" element={<Logout />} />

      {/* Level picker (shown right after login) */}
      <Route
        path="/level"
        element={
          <ProtectedRoute skipLevel>
            <LevelSelect />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes: all share the themed layout (navbar + level theme) */}
      <Route
        element={
          <ProtectedRoute>
            <LevelLayout />
          </ProtectedRoute>
        }
      >
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/assessment/selection"
        element={
          <ProtectedRoute level="foundation">
            <AssessmentSelection />
            {/* <Assessment /> */}
          </ProtectedRoute>
        }
      />
      <Route
        path="/traditional/assessment"
        element={
          <ProtectedRoute level="foundation">
            <Assessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/adaptive/assessment"
        element={
          <ProtectedRoute level="foundation">
            <AdaptiveAssess />
          </ProtectedRoute>
        }
      />
      <Route
        path="/practice"
        element={
          <ProtectedRoute level="foundation">
            <Practice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results"
        element={
          <ProtectedRoute>
            <Results />
          </ProtectedRoute>
        }
      />
      <Route
        path="/results/:id"
        element={
          <ProtectedRoute>
            <ResultDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mixedpractice"
        element={
          <ProtectedRoute level="foundation">
            <MixedPractice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/difficultpractice"
        element={
          <ProtectedRoute level="foundation">
            <DifficultPractice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upsc"
        element={
          <ProtectedRoute level="upsc">
            <UpscHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upsc/assessment"
        element={
          <ProtectedRoute level="upsc">
            <UpscAssessment />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upsc/practice"
        element={
          <ProtectedRoute level="upsc">
            <UpscPractice />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upsc/daily"
        element={
          <ProtectedRoute level="upsc">
            <DailyChallenge />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upsc/syllabus"
        element={
          <ProtectedRoute level="upsc">
            <SyllabusTracker />
          </ProtectedRoute>
        }
      />
      <Route
        path="/resources"
        element={
          <ProtectedRoute>
            <Resources />
          </ProtectedRoute>
        }
      />
      </Route>
    </Routes>
    <StudyTools />
    </>
  );
}

export default App;