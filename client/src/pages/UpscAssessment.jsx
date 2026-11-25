import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DiffAssess from "./difficultassess.jsx";
import LevelBanner from "../components/LevelBanner.jsx";
import { upscSubjectBanks, upscMixedQuestions } from "../assets/dataset/upsc-data.js";

const count = (bank) => Object.values(bank).flat().length;

const assessments = [
  { id: "mock", title: "Full UPSC Mock Assessment", description: "Questions from every subject with adaptive difficulty. Closest to a Prelims-style test.", questions: upscMixedQuestions, icon: "🎯", color: "from-violet-500 to-fuchsia-500", time: "40-60 mins" },
  { id: "polity", title: "Indian Polity", description: "Constitution, Fundamental Rights, Parliament, amendments and landmark cases.", questions: upscSubjectBanks.polity, icon: "⚖️", color: "from-blue-500 to-indigo-500", time: "15-20 mins" },
  { id: "history", title: "History", description: "Ancient, medieval and modern India, and the freedom struggle.", questions: upscSubjectBanks.history, icon: "🏺", color: "from-amber-500 to-orange-500", time: "15-20 mins" },
  { id: "geography", title: "Geography", description: "Indian and world geography, climate, rivers, soils and landforms.", questions: upscSubjectBanks.geography, icon: "🗺️", color: "from-emerald-500 to-green-500", time: "15-20 mins" },
  { id: "economy", title: "Indian Economy", description: "Monetary policy, budget, banking, inflation and development concepts.", questions: upscSubjectBanks.economy, icon: "💹", color: "from-rose-500 to-pink-500", time: "15-20 mins" },
  { id: "environment", title: "Environment & Ecology", description: "Biodiversity, conventions, conservation and climate change.", questions: upscSubjectBanks.environment, icon: "🌿", color: "from-teal-500 to-cyan-500", time: "15-20 mins" },
  { id: "scitech", title: "Science & Technology", description: "Space, biotech, nuclear, IT and everyday science.", questions: upscSubjectBanks.scitech, icon: "🔬", color: "from-sky-500 to-blue-500", time: "15-20 mins" },
  { id: "csat", title: "CSAT: Reasoning & Aptitude", description: "Logical reasoning, numeracy and data problems in UPSC CSAT style.", questions: upscSubjectBanks.csat, icon: "🧮", color: "from-purple-500 to-violet-500", time: "15-20 mins" },
];

export default function UpscAssessment() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  if (selected) {
    return (
      <div className="h-screen w-screen relative">
        <div className="relative z-10">
          <div className="absolute top-4 left-4 z-20">
            <button
              onClick={() => {
                if (window.confirm("Leave this assessment? Your progress will not be saved.")) setSelected(null);
              }}
              className="bg-white hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-xl shadow-lg border border-gray-200"
            >
              ← Exit Assessment
            </button>
          </div>
          <DiffAssess
            key={selected.id}
            questionsData={selected.questions}
            assessmentTitle={`UPSC Assessment: ${selected.title}`}
            assessmentSubtitle={selected.description}
            mode="assessment"
            saveResult
            track="upsc"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <LevelBanner active="upsc" />
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">UPSC Assessment</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take a graded assessment. Your marks are saved and you get a performance summary at the end.
          </p>
          <button
            onClick={() => navigate("/results?track=upsc")}
            className="mt-4 px-5 py-2 rounded-xl bg-white border border-violet-200 text-violet-700 font-bold hover:bg-violet-50"
          >
            📊 View my UPSC marks
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assessments.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s)}
              className="text-left bg-white rounded-3xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition overflow-hidden border border-slate-100"
            >
              <div className={`bg-gradient-to-r ${s.color} p-5 text-white`}>
                <div className="text-3xl mb-2">{s.icon}</div>
                <h3 className="text-xl font-black">{s.title}</h3>
              </div>
              <div className="p-5">
                <p className="text-sm text-slate-600 mb-4">{s.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Question pool</span>
                  <span className="font-bold text-slate-800">{count(s.questions)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Time</span>
                  <span className="font-bold text-slate-800">{s.time}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}