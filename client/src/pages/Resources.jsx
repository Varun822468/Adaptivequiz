import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import LevelBanner from "../components/LevelBanner.jsx";
import { resources, resourceCategories } from "../assets/dataset/resources.js";
import { useLevel } from "../context/LevelContext.jsx";
import { loadJSON, saveJSON } from "../lib/storage.js";

const typeStyles = {
  Website: "bg-blue-100 text-blue-700",
  Government: "bg-emerald-100 text-emerald-700",
  News: "bg-amber-100 text-amber-700",
  Book: "bg-purple-100 text-purple-700",
  Tip: "bg-rose-100 text-rose-700",
};

const typeIcons = { Website: "🌐", Government: "🏛️", News: "📰", Book: "📖", Tip: "💡" };

export default function Resources() {
  const { level } = useLevel();
  const [track, setTrack] = useState(level || "all"); // all | foundation | upsc
  const [category, setCategory] = useState("All");
  const [type, setType] = useState("All");
  const [query, setQuery] = useState("");
  const [showSaved, setShowSaved] = useState(false);
  const [saved, setSaved] = useState(() => loadJSON("resources:saved", []));
  const [done, setDone] = useState(() => loadJSON("resources:done", []));

  useEffect(() => saveJSON("resources:saved", saved), [saved]);
  useEffect(() => saveJSON("resources:done", done), [done]);

  const toggle = (list, setList, id) =>
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((r) => {
      if (showSaved && !saved.includes(r.id)) return false;
      if (track !== "all" && r.track !== track && r.track !== "both") return false;
      if (category !== "All" && r.category !== category) return false;
      if (type !== "All" && r.type !== type) return false;
      if (q && !(r.title + " " + r.description + " " + r.category).toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [track, category, type, query, showSaved, saved]);

  const doneCount = resources.filter((r) => done.includes(r.id)).length;

  const pill = (activeState) =>
    `px-3 py-1.5 rounded-full text-sm font-semibold border transition ${
      activeState
        ? "bg-violet-600 text-white border-violet-600"
        : "bg-white text-slate-600 border-slate-200 hover:border-violet-300"
    }`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-rose-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <LevelBanner active="resources" />

        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3">Study Resources</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Curated books, official sources and strategy tips for both Foundation and UPSC preparation.
            Save the ones you like and mark them as done.
          </p>
          <p className="text-sm text-slate-500 mt-2">
            {doneCount} of {resources.length} completed · {saved.length} saved
          </p>
        </motion.div>

        {/* Controls */}
        <div className="bg-white rounded-3xl shadow-lg border border-violet-100 p-5 mb-8 space-y-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources (e.g. polity, laxmikanth, budget)..."
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
          />

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-bold text-slate-500 mr-1">Level:</span>
            <button className={pill(track === "all")} onClick={() => setTrack("all")}>All</button>
            <button className={pill(track === "foundation")} onClick={() => setTrack("foundation")}>Foundation</button>
            <button className={pill(track === "upsc")} onClick={() => setTrack("upsc")}>UPSC</button>
            <span className="mx-2 text-slate-300">|</span>
            <button className={pill(showSaved)} onClick={() => setShowSaved(!showSaved)}>
              ★ Saved only
            </button>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-bold text-slate-500 mr-1">Subject:</span>
            {resourceCategories.map((c) => (
              <button key={c} className={pill(category === c)} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-bold text-slate-500 mr-1">Type:</span>
            {["All", "Website", "Government", "News", "Book", "Tip"].map((t) => (
              <button key={t} className={pill(type === t)} onClick={() => setType(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center text-slate-500 py-16">No resources match your filters.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((r) => {
              const isSaved = saved.includes(r.id);
              const isDone = done.includes(r.id);
              return (
                <motion.div
                  key={r.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`bg-white rounded-2xl border-2 p-5 shadow-md hover:shadow-xl transition flex flex-col ${
                    isDone ? "border-emerald-200" : "border-slate-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${typeStyles[r.type]}`}>
                      {typeIcons[r.type]} {r.type}
                    </span>
                    <button
                      onClick={() => toggle(saved, setSaved, r.id)}
                      title={isSaved ? "Remove from saved" : "Save"}
                      className={`text-xl leading-none ${isSaved ? "text-amber-500" : "text-slate-300 hover:text-amber-400"}`}
                    >
                      ★
                    </button>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{r.title}</h3>
                  <p className="text-xs font-semibold text-violet-600 mb-2">
                    {r.category} · {r.track === "both" ? "Foundation + UPSC" : r.track === "upsc" ? "UPSC" : "Foundation"}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">{r.description}</p>

                  <div className="flex items-center gap-2 mt-4">
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-sm font-bold rounded-xl hover:opacity-90"
                      >
                        Open ↗
                      </a>
                    )}
                    <button
                      onClick={() => toggle(done, setDone, r.id)}
                      className={`${r.url ? "" : "flex-1"} px-3 py-2 text-sm font-bold rounded-xl border ${
                        isDone
                          ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                          : "bg-white border-slate-200 text-slate-600 hover:border-emerald-300"
                      }`}
                    >
                      {isDone ? "✓ Done" : "Mark done"}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <p className="text-xs text-slate-400 text-center mt-10">
          Links open external websites. Please verify the latest syllabus and notifications on the official UPSC website.
        </p>
      </div>
    </div>
  );
}
