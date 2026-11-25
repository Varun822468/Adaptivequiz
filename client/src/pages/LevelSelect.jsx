import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLevel } from "../context/LevelContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function LevelSelect() {
  const navigate = useNavigate();
  const { setLevel } = useLevel();
  const { user } = useAuth();

  const choose = (l) => {
    setLevel(l);
    navigate("/", { replace: true });
  };

  const cards = [
    {
      id: "foundation",
      icon: "🌱",
      title: "Foundation Level",
      tag: "Low level preparation",
      text: "Aptitude basics: percentages, profit and loss, interest, ratio and ages with adaptive difficulty.",
      points: ["Practice mode", "Traditional & adaptive assessments", "Results and progress"],
      bg: "from-emerald-50 to-teal-100 border-emerald-200",
      btn: "bg-emerald-600 hover:bg-emerald-700",
      tagCls: "text-emerald-700",
    },
    {
      id: "upsc",
      icon: "🏛️",
      title: "High Level",
      tag: "UPSC preparation",
      text: "Prelims-style questions in 7 subjects, daily challenge with streaks, syllabus tracker and resources.",
      points: ["Subject-wise & mock practice", "UPSC graded assessment with AI summary", "Daily challenge, syllabus tracker"],
      bg: "from-amber-50 to-orange-100 border-orange-200",
      btn: "bg-orange-600 hover:bg-orange-700",
      tagCls: "text-orange-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 flex items-center justify-center px-4 py-10">
      <div className="max-w-5xl w-full">
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">
            Welcome{user?.name ? `, ${user.name.split(" ")[0]}` : ""} 👋
          </h1>
          <p className="text-lg text-slate-600">Choose your preparation level to continue.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -6 }}
              onClick={() => choose(c.id)}
              className={`text-left rounded-3xl p-8 bg-gradient-to-br ${c.bg} border-2 shadow-lg`}
            >
              <div className="text-5xl mb-3">{c.icon}</div>
              <h2 className="text-3xl font-black text-slate-800">{c.title}</h2>
              <p className={`text-sm font-bold mb-3 ${c.tagCls}`}>{c.tag}</p>
              <p className="text-slate-600 mb-4">{c.text}</p>
              <ul className="text-sm text-slate-700 space-y-1 mb-6">
                {c.points.map((p) => (
                  <li key={p}>✓ {p}</li>
                ))}
              </ul>
              <span className={`inline-block px-6 py-3 text-white font-bold rounded-xl shadow ${c.btn}`}>
                Continue with {c.title} →
              </span>
            </motion.button>
          ))}
        </div>
        <p className="text-center text-sm text-slate-500 mt-8">You can switch level anytime from the home page.</p>
      </div>
    </div>
  );
}
