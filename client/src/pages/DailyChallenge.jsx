import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LevelBanner from "../components/LevelBanner.jsx";
import { upscAllQuestionsFlat } from "../assets/dataset/upsc-data.js";
import { loadJSON, saveJSON } from "../lib/storage.js";

const QUESTIONS_PER_DAY = 5;

const dateKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Small seeded PRNG so every user gets the same questions on the same day
const seededRandom = (seedStr) => {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const pickDailyQuestions = (key) => {
  const rand = seededRandom(key);
  const pool = [...upscAllQuestionsFlat];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, QUESTIONS_PER_DAY);
};

const calcStreak = (history) => {
  let streak = 0;
  const d = new Date();
  // If today is not done yet, streak counts from yesterday
  if (!history[dateKey(d)]) d.setDate(d.getDate() - 1);
  while (history[dateKey(d)]) {
    streak += 1;
    d.setDate(d.getDate() - 1);
  }
  return streak;
};

const subjectLabel = {
  polity: "Polity", history: "History", geography: "Geography", economy: "Economy",
  environment: "Environment", scitech: "Science & Tech", csat: "CSAT",
};

export default function DailyChallenge() {
  const today = dateKey();
  const questions = useMemo(() => pickDailyQuestions(today), [today]);
  const [history, setHistory] = useState(() => loadJSON("daily:history", {}));
  const [answers, setAnswers] = useState(() => loadJSON(`daily:answers:${today}`, {}));
  const [index, setIndex] = useState(0);

  useEffect(() => saveJSON("daily:history", history), [history]);
  useEffect(() => saveJSON(`daily:answers:${today}`, answers), [answers, today]);

  const answeredCount = Object.keys(answers).length;
  const completed = answeredCount === questions.length;
  const score = questions.filter((q, i) => answers[i] === q.correct).length;
  const streak = calcStreak(history);
  const q = questions[index];

  const choose = (opt) => {
    if (answers[index] !== undefined) return;
    const next = { ...answers, [index]: opt };
    setAnswers(next);
    if (Object.keys(next).length === questions.length) {
      const s = questions.filter((qq, i) => next[i] === qq.correct).length;
      setHistory((h) => ({ ...h, [today]: { score: s, total: questions.length } }));
    }
  };

  const recentDays = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const k = dateKey(d);
    return { k, label: d.toLocaleDateString(undefined, { weekday: "short" }), done: !!history[k] };
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <LevelBanner active="upsc" />

        <div className="text-center mb-6">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">Daily Challenge 🔥</h1>
          <p className="text-slate-600">{QUESTIONS_PER_DAY} fresh UPSC questions every day. Keep your streak alive!</p>
        </div>

        {/* Streak card */}
        <div className="bg-white rounded-3xl shadow-lg border border-orange-100 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-bold text-slate-500">Current streak</p>
              <p className="text-3xl font-black text-orange-500">{streak} day{streak === 1 ? "" : "s"}</p>
            </div>
            <div className="flex gap-2">
              {recentDays.map((d) => (
                <div key={d.k} className="text-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${d.done ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-400"}`}>
                    {d.done ? "✓" : "·"}
                  </div>
                  <span className="text-[10px] text-slate-500">{d.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {completed && (
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-3xl p-6 mb-6 text-center shadow-lg">
            <p className="text-2xl font-black">Today's challenge complete!</p>
            <p className="mt-1">You scored {score}/{questions.length}. Come back tomorrow for new questions.</p>
          </motion.div>
        )}

        {/* Question navigation */}
        <div className="flex justify-center gap-2 mb-4">
          {questions.map((_, i) => {
            const isCorrect = answers[i] !== undefined && answers[i] === questions[i].correct;
            const isWrong = answers[i] !== undefined && !isCorrect;
            return (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`w-10 h-10 rounded-full font-bold border-2 ${
                  i === index ? "border-violet-600" : "border-transparent"
                } ${isCorrect ? "bg-emerald-100 text-emerald-700" : isWrong ? "bg-rose-100 text-rose-700" : "bg-white text-slate-600 shadow"}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>

        {/* Question */}
        <motion.div key={index} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl shadow-xl border border-violet-100 p-6 md:p-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-violet-100 text-violet-700">
              {subjectLabel[q.subject]}
            </span>
            <span className="text-xs font-semibold text-slate-400 capitalize">{q.difficulty.replace("_", " ")}</span>
          </div>
          <p className="text-lg font-semibold text-slate-900 whitespace-pre-line mb-6">{q.question}</p>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const chosen = answers[index];
              const reveal = chosen !== undefined;
              let style = "border-slate-200 hover:border-violet-300 hover:bg-violet-50";
              if (reveal && i === q.correct) style = "border-emerald-400 bg-emerald-50";
              else if (reveal && i === chosen) style = "border-rose-400 bg-rose-50";
              return (
                <button
                  key={i}
                  disabled={reveal}
                  onClick={() => choose(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition ${style}`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </button>
              );
            })}
          </div>

          {answers[index] !== undefined && (
            <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-slate-700">
              <span className="font-bold">Explanation: </span>
              {q.explanation}
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button disabled={index === 0} onClick={() => setIndex(index - 1)} className="px-5 py-2 rounded-xl border border-slate-200 font-bold text-slate-600 disabled:opacity-40">
              ← Previous
            </button>
            <button disabled={index === questions.length - 1} onClick={() => setIndex(index + 1)} className="px-5 py-2 rounded-xl bg-violet-600 text-white font-bold disabled:opacity-40">
              Next →
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
