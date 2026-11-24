import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, Target, FileCheck2, Flame, ListChecks, BookOpen, BarChart3,
  Scale, Landmark, Globe2, TrendingUp, Leaf, FlaskConical, Calculator,
} from "lucide-react";
import UserAvatar from "../components/UserAvatar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import useSummary, { fmtAvg } from "../lib/useSummary.js";
import { loadJSON } from "../lib/storage.js";
import { upscSubjectBanks } from "../assets/dataset/upsc-data.js";

const NAVY = "#0b1530";
const GOLD = "#c9a24b";

const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const streakOf = (history) => {
  let n = 0;
  const d = new Date();
  if (!history[dateKey(d)]) d.setDate(d.getDate() - 1);
  while (history[dateKey(d)]) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
};

const subjects = [
  { id: "polity", name: "Indian Polity", Icon: Scale },
  { id: "history", name: "History", Icon: Landmark },
  { id: "geography", name: "Geography", Icon: Globe2 },
  { id: "economy", name: "Economy", Icon: TrendingUp },
  { id: "environment", name: "Environment", Icon: Leaf },
  { id: "scitech", name: "Science & Tech", Icon: FlaskConical },
  { id: "csat", name: "CSAT", Icon: Calculator },
];

const fade = { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.45 } };

export default function HomeUpsc() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { summary } = useSummary("upsc");

  const total = summary.totalCorrect + summary.totalWrong;
  const accuracy = total ? Math.round((summary.totalCorrect / total) * 100) : 0;
  const streak = useMemo(() => streakOf(loadJSON("daily:history", {})), []);
  const covered = useMemo(
    () => Object.values(loadJSON("syllabus:checked", {})).filter(Boolean).length,
    []
  );
  const bankSize = (id) => Object.values(upscSubjectBanks[id] || {}).flat().length;
  const first = user?.name?.split(" ")[0];

  const stats = [
    { label: "Mock tests attempted", value: summary.totalAssessments || 0 },
    { label: "Questions correct", value: summary.totalCorrect || 0 },
    { label: "Overall accuracy", value: `${accuracy}%` },
    { label: "Avg. time / test", value: fmtAvg(summary.avgTimeSec) },
  ];

  const tools = [
    { Icon: Target, title: "Subject-wise Practice", text: "Seven Prelims subjects with adaptive difficulty and instant explanations.", to: "/upsc/practice" },
    { Icon: FileCheck2, title: "Graded Mock Assessment", text: "Timed, full-length test with a performance summary and review.", to: "/upsc/assessment" },
    { Icon: Flame, title: "Daily Challenge", text: "Fresh questions every day. Build a consistent study streak.", to: "/upsc/daily" },
    { Icon: ListChecks, title: "Syllabus Tracker", text: "Track Prelims and Mains topics against the official syllabus.", to: "/upsc/syllabus" },
    { Icon: BookOpen, title: "Reference Library", text: "Curated books, sources and study material for each stage.", to: "/resources" },
    { Icon: BarChart3, title: "Performance Analytics", text: "Review past attempts and identify weak areas.", to: "/results?track=upsc" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-slate-800">
      {/* ---------- Hero ---------- */}
      <section style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #14264f 100%)` }} className="relative overflow-hidden text-white">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0 1px, transparent 1px 22px)" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-5 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-5" style={{ color: GOLD }}>
              Union Public Service Commission · Civil Services
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] mb-6">
              {first ? `Welcome back, ${first}.` : "Prepare with discipline."}
              <br />
              <span style={{ color: GOLD }}>Build the rank you aim for.</span>
            </h1>
            <p className="text-slate-300 text-lg max-w-xl leading-relaxed mb-9">
              A structured Prelims preparation workspace: subject-wise practice, graded mocks, daily
              challenges and syllabus tracking, all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/upsc/practice")}
                className="group inline-flex items-center gap-2 px-7 py-3.5 font-semibold rounded-md text-[#0b1530] transition hover:brightness-110"
                style={{ background: GOLD }}
              >
                Start practice <ArrowRight size={18} className="transition group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate("/upsc/assessment")}
                className="px-7 py-3.5 font-semibold rounded-md border border-white/30 hover:bg-white/10 transition"
              >
                Take a mock test
              </button>
            </div>
          </motion.div>

          {/* Today panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="lg:col-span-2 rounded-xl bg-white/[0.06] border border-white/15 backdrop-blur p-6"
          >
            <div className="flex items-center gap-3 pb-5 border-b border-white/10">
              <UserAvatar user={user} size={46} ring="ring-2 ring-[#c9a24b]" />
              <div className="min-w-0">
                <p className="font-semibold truncate">{user?.name || "Aspirant"}</p>
                <p className="text-xs text-slate-400 truncate">{user?.targetExam || "UPSC Civil Services"}</p>
              </div>
            </div>
            <dl className="grid grid-cols-2 gap-4 pt-5">
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">Daily streak</dt>
                <dd className="font-serif text-3xl mt-1" style={{ color: GOLD }}>{streak} <span className="text-base text-slate-300">days</span></dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-widest text-slate-400">Topics covered</dt>
                <dd className="font-serif text-3xl mt-1" style={{ color: GOLD }}>{covered}</dd>
              </div>
            </dl>
            <button
              onClick={() => navigate("/upsc/daily")}
              className="mt-6 w-full flex items-center justify-between px-4 py-3 rounded-md bg-white/10 hover:bg-white/15 text-sm font-semibold transition"
            >
              Today's challenge <ArrowRight size={16} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ---------- Stats strip ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 bg-white rounded-lg shadow-xl shadow-slate-300/40 border border-slate-200 divide-x divide-y lg:divide-y-0 divide-slate-200">
          {stats.map((s) => (
            <div key={s.label} className="p-6">
              <p className="font-serif text-3xl font-semibold" style={{ color: NAVY }}>{s.value}</p>
              <p className="text-xs uppercase tracking-wider text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Toolkit ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div {...fade} className="mb-10 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>Preparation toolkit</p>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold" style={{ color: NAVY }}>Everything a serious aspirant needs</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map(({ Icon, title, text, to }, i) => (
            <motion.button
              key={title}
              {...fade}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => navigate(to)}
              className="group text-left bg-white rounded-lg border border-slate-200 p-7 hover:shadow-xl hover:shadow-slate-300/40 hover:-translate-y-1 transition-all duration-300 border-t-4"
              style={{ borderTopColor: GOLD }}
            >
              <span className="w-11 h-11 rounded-md flex items-center justify-center mb-5 text-white" style={{ background: NAVY }}>
                <Icon size={20} />
              </span>
              <h3 className="font-serif text-xl font-semibold mb-2" style={{ color: NAVY }}>{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">{text}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: NAVY }}>
                Open <ArrowRight size={15} className="transition group-hover:translate-x-1" />
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ---------- Subjects ---------- */}
      <section className="bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <motion.div {...fade} className="mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>Question bank</p>
            <h2 className="font-serif text-3xl font-semibold" style={{ color: NAVY }}>Subjects covered</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
            {subjects.map(({ id, name, Icon }) => (
              <button
                key={id}
                onClick={() => navigate("/upsc/practice")}
                className="p-5 rounded-lg border border-slate-200 hover:border-[#c9a24b] hover:bg-[#fbf8f0] text-left transition"
              >
                <Icon size={22} style={{ color: NAVY }} className="mb-3" />
                <p className="font-semibold text-sm" style={{ color: NAVY }}>{name}</p>
                <p className="text-xs text-slate-500 mt-1">{bankSize(id)} questions</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Exam stages ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <motion.div {...fade} className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] mb-3" style={{ color: GOLD }}>The journey</p>
          <h2 className="font-serif text-3xl font-semibold" style={{ color: NAVY }}>Civil Services examination stages</h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-0 md:gap-0 border border-slate-200 rounded-lg overflow-hidden bg-white">
          {[
            { n: "01", t: "Preliminary", d: "Objective screening: General Studies Paper I and CSAT (qualifying)." },
            { n: "02", t: "Mains", d: "Descriptive, nine-paper written examination testing depth and analysis." },
            { n: "03", t: "Personality Test", d: "Interview assessing mental calibre, clarity and suitability for service." },
          ].map((s, i) => (
            <div key={s.n} className={`p-8 ${i ? "border-t md:border-t-0 md:border-l border-slate-200" : ""}`}>
              <p className="font-serif text-4xl" style={{ color: GOLD }}>{s.n}</p>
              <h3 className="font-semibold text-lg mt-3 mb-2" style={{ color: NAVY }}>{s.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ background: NAVY }} className="text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap justify-between gap-3">
          <p className="font-serif text-white text-lg">NeuroQuiz <span style={{ color: GOLD }}>· UPSC</span></p>
          <p>Consistency over intensity. Keep going.</p>
        </div>
      </footer>
    </div>
  );
}
