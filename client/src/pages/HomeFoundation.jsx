import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import useSummary from "../lib/useSummary.js";
import { loadJSON, saveJSON } from "../lib/storage.js";

const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

// Small warm-up bank for the "Quick Brain Boost" widget
const QUICK = [
  { q: "What is 25% of 240?", o: ["50", "60", "70", "80"], a: 1, tip: "25% = 1/4, and 240 ÷ 4 = 60." },
  { q: "A shirt costs ₹500 and is sold at 20% profit. Selling price?", o: ["₹550", "₹580", "₹600", "₹620"], a: 2, tip: "20% of 500 = 100, so 500 + 100 = ₹600." },
  { q: "Simple interest on ₹1000 at 10% per year for 2 years?", o: ["₹100", "₹150", "₹200", "₹250"], a: 2, tip: "SI = P × R × T / 100 = 1000 × 10 × 2 / 100 = ₹200." },
  { q: "Divide 60 in the ratio 2 : 3. The larger part is?", o: ["24", "30", "36", "40"], a: 2, tip: "Total parts = 5, one part = 12, larger = 3 × 12 = 36." },
  { q: "A is twice as old as B. B is 15. How old is A?", o: ["25", "30", "35", "45"], a: 1, tip: "2 × 15 = 30." },
  { q: "If cost price is ₹800 and selling price is ₹720, loss % is?", o: ["8%", "10%", "12%", "15%"], a: 1, tip: "Loss = 80, 80/800 × 100 = 10%." },
  { q: "What is 15% of 200?", o: ["25", "30", "35", "40"], a: 1, tip: "10% = 20, 5% = 10, so 30." },
  { q: "Ratio of 1 hour to 40 minutes is?", o: ["2 : 3", "3 : 2", "1 : 40", "5 : 3"], a: 1, tip: "60 : 40 = 3 : 2." },
];

const topics = [
  { emoji: "💯", name: "Percentages", bg: "from-pink-400 to-rose-500" },
  { emoji: "📈", name: "Profit & Loss", bg: "from-emerald-400 to-teal-500" },
  { emoji: "🏦", name: "Interest", bg: "from-amber-400 to-orange-500" },
  { emoji: "⚖️", name: "Ratio", bg: "from-sky-400 to-blue-500" },
  { emoji: "🎂", name: "Ages", bg: "from-violet-400 to-fuchsia-500" },
];

const badgeDefs = [
  { id: "first", emoji: "🚀", name: "First Test", need: (s) => s.totalAssessments >= 1 },
  { id: "c10", emoji: "⭐", name: "10 Correct", need: (s) => s.totalCorrect >= 10 },
  { id: "c50", emoji: "🔥", name: "50 Correct", need: (s) => s.totalCorrect >= 50 },
  { id: "c100", emoji: "👑", name: "100 Correct", need: (s) => s.totalCorrect >= 100 },
  { id: "t5", emoji: "🎯", name: "5 Tests", need: (s) => s.totalAssessments >= 5 },
];

function Ring({ value, max, size = 120 }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const pct = Math.min(1, max ? value / max : 0);
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#ede9fe" strokeWidth="12" fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r} stroke="url(#g)" strokeWidth="12" fill="none" strokeLinecap="round"
        strokeDasharray={c} initial={{ strokeDashoffset: c }} animate={{ strokeDashoffset: c * (1 - pct) }}
        transition={{ duration: 0.8 }}
      />
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function HomeFoundation() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { summary } = useSummary("foundation");

  const goal = user?.dailyGoal || 10;
  const key = `foundation:quick:${today()}`;
  const [done, setDone] = useState(() => loadJSON(key, 0));
  const [qi, setQi] = useState(() => Math.floor(Math.random() * QUICK.length));
  const [picked, setPicked] = useState(null);
  const [streakCombo, setCombo] = useState(0);

  const q = QUICK[qi];
  const answered = picked !== null;
  const correct = answered && picked === q.a;

  const choose = (i) => {
    if (answered) return;
    setPicked(i);
    setCombo((c) => (i === q.a ? c + 1 : 0));
    const n = done + 1;
    setDone(n);
    saveJSON(key, n);
  };
  const next = () => {
    let n = qi;
    while (n === qi) n = Math.floor(Math.random() * QUICK.length);
    setQi(n);
    setPicked(null);
  };

  const xp = (summary.totalCorrect || 0) * 10 + done * 2;
  const lvl = Math.floor(xp / 100) + 1;
  const xpInLevel = xp % 100;
  const first = user?.name?.split(" ")[0] || "Champ";
  const badges = useMemo(() => badgeDefs.map((b) => ({ ...b, got: b.need(summary) })), [summary]);
  const goalMet = done >= goal;

  return (
    <div className="min-h-screen font-rounded bg-gradient-to-b from-violet-50 via-white to-pink-50 overflow-x-hidden">
      {/* ---------- Hero ---------- */}
      <section className="relative bg-gradient-to-br from-violet-600 via-fuchsia-500 to-orange-400 text-white overflow-hidden">
        {["🧮", "✏️", "📚", "💡", "🎯", "⭐"].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl select-none opacity-30"
            style={{ left: `${8 + i * 17}%`, top: `${10 + (i % 3) * 28}%` }}
            animate={{ y: [0, -18, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {e}
          </motion.span>
        ))}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/20 rounded-full text-sm font-bold mb-5">
              🌱 Foundation Level · Level {lvl}
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-5">
              Hey {first}! <motion.span className="inline-block origin-bottom-right" animate={{ rotate: [0, 20, -10, 20, 0] }} transition={{ repeat: Infinity, duration: 2.5, repeatDelay: 1 }}>👋</motion.span>
              <br />Ready to level up?
            </h1>
            <p className="text-lg text-white/90 max-w-lg mb-8">
              Learn aptitude the fun way. Answer questions, earn XP, unlock badges and watch your skills grow every day.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/practice")} className="px-8 py-4 bg-white text-violet-700 font-black rounded-2xl shadow-xl">
                🎮 Start Practice
              </motion.button>
              <motion.button whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/assessment/selection")} className="px-8 py-4 bg-black/20 border-2 border-white/60 font-black rounded-2xl hover:bg-black/30">
                📝 Take a Test
              </motion.button>
            </div>
          </motion.div>

          {/* Goal + XP card */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="bg-white text-slate-800 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-6">
              <div className="relative shrink-0">
                <Ring value={done} max={goal} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-violet-700">{Math.min(done, goal)}</span>
                  <span className="text-xs font-bold text-slate-400">of {goal}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-400 uppercase">Daily goal</p>
                <p className="text-xl font-black">{goalMet ? "Goal smashed! 🎉" : "Keep going!"}</p>
                <p className="text-sm text-slate-500">Answer {goal} questions today. Change it in your profile.</p>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex justify-between text-sm font-bold mb-2">
                <span className="text-violet-700">⚡ Level {lvl}</span>
                <span className="text-slate-400">{xpInLevel}/100 XP</span>
              </div>
              <div className="h-4 bg-violet-100 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 rounded-full" initial={{ width: 0 }} animate={{ width: `${xpInLevel}%` }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Quick Brain Boost ---------- */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-violet-100 p-6 sm:p-8">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-black text-slate-800">⚡ Quick Brain Boost</h2>
            {streakCombo > 1 && (
              <motion.span key={streakCombo} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-black">
                🔥 {streakCombo} in a row!
              </motion.span>
            )}
          </div>
          <p className="text-lg font-bold text-slate-700 mb-5">{q.q}</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {q.o.map((opt, i) => {
              const isRight = answered && i === q.a;
              const isWrong = answered && i === picked && i !== q.a;
              return (
                <motion.button
                  key={`${qi}-${i}`}
                  whileHover={!answered ? { scale: 1.03 } : {}}
                  whileTap={!answered ? { scale: 0.97 } : {}}
                  animate={isWrong ? { x: [0, -8, 8, -6, 6, 0] } : isRight ? { scale: [1, 1.06, 1] } : {}}
                  onClick={() => choose(i)}
                  className={`px-5 py-4 rounded-2xl border-2 text-left font-bold transition-colors ${
                    isRight ? "bg-emerald-100 border-emerald-400 text-emerald-800"
                    : isWrong ? "bg-rose-100 border-rose-400 text-rose-700"
                    : "bg-slate-50 border-slate-200 hover:border-violet-400 hover:bg-violet-50"
                  }`}
                >
                  <span className="inline-flex w-7 h-7 mr-3 rounded-full bg-white border items-center justify-center text-sm">{"ABCD"[i]}</span>
                  {opt} {isRight && "✅"} {isWrong && "❌"}
                </motion.button>
              );
            })}
          </div>
          <AnimatePresence>
            {answered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mt-5 p-4 rounded-2xl ${correct ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                <p className="font-black mb-1">{correct ? "🎉 Awesome! +2 XP" : "😅 Almost! Here's the trick:"}</p>
                <p className="text-sm">{q.tip}</p>
                <button onClick={next} className="mt-3 px-5 py-2 bg-violet-600 text-white font-bold rounded-xl hover:bg-violet-700">Next question →</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ---------- Topics ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="text-3xl font-black text-slate-800 mb-2">Pick a topic and play 🎮</h2>
        <p className="text-slate-500 mb-8">Tap a card to start practising.</p>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
          {topics.map((t, i) => (
            <motion.button
              key={t.name}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              whileHover={{ y: -8, rotate: i % 2 ? 2 : -2 }} whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/practice")}
              className={`aspect-square rounded-3xl bg-gradient-to-br ${t.bg} text-white shadow-lg flex flex-col items-center justify-center gap-3 p-4`}
            >
              <span className="text-5xl">{t.emoji}</span>
              <span className="font-black text-lg text-center leading-tight">{t.name}</span>
            </motion.button>
          ))}
        </div>
      </section>

      {/* ---------- Stats + badges ---------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-violet-100">
          <h3 className="text-2xl font-black mb-6">📊 Your progress</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { v: summary.totalAssessments || 0, l: "Tests", c: "bg-violet-100 text-violet-700" },
              { v: summary.totalCorrect || 0, l: "Correct", c: "bg-emerald-100 text-emerald-700" },
              { v: summary.totalWrong || 0, l: "To review", c: "bg-amber-100 text-amber-700" },
            ].map((s) => (
              <motion.div key={s.l} whileHover={{ scale: 1.06 }} className={`rounded-2xl p-5 ${s.c}`}>
                <p className="text-4xl font-black">{s.v}</p>
                <p className="text-sm font-bold">{s.l}</p>
              </motion.div>
            ))}
          </div>
          <button onClick={() => navigate("/results?track=foundation")} className="mt-6 w-full py-3 rounded-xl bg-violet-600 text-white font-bold hover:bg-violet-700">
            See all results →
          </button>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-violet-100">
          <h3 className="text-2xl font-black mb-6">🏅 Badges</h3>
          <div className="grid grid-cols-5 gap-3">
            {badges.map((b) => (
              <motion.div key={b.id} whileHover={{ scale: 1.12, rotate: 4 }} className={`flex flex-col items-center text-center ${b.got ? "" : "opacity-35 grayscale"}`} title={b.got ? "Unlocked!" : "Locked"}>
                <span className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 flex items-center justify-center text-2xl shadow">{b.emoji}</span>
                <span className="text-xs font-bold mt-2 leading-tight">{b.name}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-6">Answer more questions correctly to unlock every badge.</p>
        </div>
      </section>
    </div>
  );
}
