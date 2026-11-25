import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LevelBanner from "../components/LevelBanner.jsx";
import { upscAllQuestionsFlat } from "../assets/dataset/upsc-data.js";
import { resources } from "../assets/dataset/resources.js";

export default function UpscHub() {
  const navigate = useNavigate();

  const features = [
    { icon: "🎯", title: "Subject-wise & Mock Practice", text: "Polity, History, Geography, Economy, Environment, Sci-Tech and CSAT with adaptive difficulty.", path: "/upsc/practice", color: "from-violet-500 to-purple-500" },
    { icon: "📝", title: "UPSC Assessment", text: "Take a graded UPSC test (full mock or subject-wise). Marks are saved with an AI summary.", path: "/upsc/assessment", color: "from-indigo-500 to-violet-600" },
    { icon: "🔥", title: "Daily Challenge", text: "5 new UPSC questions every day with a streak tracker.", path: "/upsc/daily", color: "from-orange-500 to-rose-500" },
    { icon: "✅", title: "Syllabus Tracker", text: "Track Prelims, CSAT and Mains topics and see your overall progress.", path: "/upsc/syllabus", color: "from-emerald-500 to-teal-500" },
    { icon: "📚", title: "Resources Library", text: "Books, official sources and strategy tips. Save and mark as done.", path: "/resources", color: "from-blue-500 to-indigo-500" },
    { icon: "📊", title: "My UPSC Marks", text: "See your saved marks, AI summaries and subject-wise performance.", path: "/results?track=upsc", color: "from-pink-500 to-fuchsia-500" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <LevelBanner active="upsc" />

        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-violet-100 text-violet-700 font-bold text-sm mb-4">
            High Level Preparation
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4">UPSC Preparation</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Civil Services level questions, study resources and planning tools in one place.
          </p>
          <div className="flex justify-center gap-6 mt-6 text-center">
            <div><p className="text-3xl font-black text-violet-600">{upscAllQuestionsFlat.length}</p><p className="text-xs text-slate-500 font-semibold">Questions</p></div>
            <div><p className="text-3xl font-black text-rose-500">7</p><p className="text-xs text-slate-500 font-semibold">Subjects</p></div>
            <div><p className="text-3xl font-black text-emerald-600">{resources.length}</p><p className="text-xs text-slate-500 font-semibold">Resources</p></div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.button
              key={f.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(f.path)}
              className="text-left bg-white rounded-3xl shadow-lg border border-slate-100 p-6 hover:shadow-xl"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-2xl mb-4`}>{f.icon}</div>
              <h3 className="text-xl font-black text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-600">{f.text}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}