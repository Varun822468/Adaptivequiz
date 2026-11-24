import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LevelBanner from "../components/LevelBanner.jsx";
import { loadJSON, saveJSON } from "../lib/storage.js";

// Prelims GS Paper I + CSAT, and Mains papers. Progress is stored in the browser.
const syllabus = [
  {
    stage: "Prelims - GS Paper I",
    color: "from-blue-500 to-indigo-500",
    topics: [
      "Current events of national and international importance",
      "History of India and Indian National Movement",
      "Indian and World Geography (physical, social, economic)",
      "Indian Polity and Governance (Constitution, political system, Panchayati Raj, public policy, rights issues)",
      "Economic and Social Development (sustainable development, poverty, inclusion, demographics, social sector)",
      "Environmental ecology, bio-diversity and climate change",
      "General Science",
    ],
  },
  {
    stage: "Prelims - CSAT (Paper II, qualifying)",
    color: "from-teal-500 to-emerald-500",
    topics: [
      "Comprehension",
      "Interpersonal skills including communication skills",
      "Logical reasoning and analytical ability",
      "Decision making and problem solving",
      "General mental ability",
      "Basic numeracy (Class X level) and data interpretation",
    ],
  },
  {
    stage: "Mains - GS I, II, III, IV",
    color: "from-rose-500 to-pink-500",
    topics: [
      "GS I: Indian heritage and culture, history and geography of the world and society",
      "GS II: Governance, Constitution, polity, social justice and international relations",
      "GS III: Technology, economic development, bio-diversity, environment, security and disaster management",
      "GS IV: Ethics, integrity and aptitude",
      "Essay paper",
      "Optional subject (Paper I and II)",
    ],
  },
];

export default function SyllabusTracker() {
  const [checked, setChecked] = useState(() => loadJSON("syllabus:checked", {}));

  useEffect(() => saveJSON("syllabus:checked", checked), [checked]);

  const toggle = (key) => setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const total = syllabus.reduce((n, s) => n + s.topics.length, 0);
  const done = Object.values(checked).filter(Boolean).length;
  const overall = Math.round((done / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <LevelBanner active="upsc" />

        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">Syllabus Tracker</h1>
          <p className="text-slate-600">Tick off each topic once you have covered and revised it.</p>
        </motion.div>

        <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-6 mb-8">
          <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
            <span>Overall progress</span>
            <span>{done}/{total} topics · {overall}%</span>
          </div>
          <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-500" style={{ width: `${overall}%` }} />
          </div>
        </div>

        <div className="space-y-6">
          {syllabus.map((section) => {
            const sectionDone = section.topics.filter((_, i) => checked[`${section.stage}:${i}`]).length;
            return (
              <div key={section.stage} className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden">
                <div className={`bg-gradient-to-r ${section.color} text-white px-6 py-4 flex justify-between items-center`}>
                  <h2 className="font-black text-lg">{section.stage}</h2>
                  <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
                    {sectionDone}/{section.topics.length}
                  </span>
                </div>
                <ul className="divide-y divide-slate-100">
                  {section.topics.map((topic, i) => {
                    const key = `${section.stage}:${i}`;
                    return (
                      <li key={key}>
                        <label className="flex items-start gap-3 px-6 py-4 cursor-pointer hover:bg-violet-50/50">
                          <input
                            type="checkbox"
                            checked={!!checked[key]}
                            onChange={() => toggle(key)}
                            className="mt-1 w-5 h-5 accent-violet-600"
                          />
                          <span className={checked[key] ? "text-slate-400 line-through" : "text-slate-700"}>{topic}</span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => window.confirm("Reset all syllabus progress?") && setChecked({})}
            className="text-sm text-slate-500 hover:text-rose-600 underline"
          >
            Reset progress
          </button>
        </div>
      </div>
    </div>
  );
}
