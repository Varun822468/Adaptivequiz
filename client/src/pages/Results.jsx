import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../lib/api";
import { useLevel } from "../context/LevelContext.jsx";

export default function Results() {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const { level } = useLevel();
  const track = ["upsc", "foundation", "all"].includes(params.get("track")) ? params.get("track") : level || "all";
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const q = track === "all" ? "" : `&track=${track}`;
        const { data } = await api.get(`/api/results/history?limit=50${q}`);
        setHistory(data.history || []);
      } catch (_) {
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [track]);

  const tabs = [
    { id: "all", label: "All" },
    { id: "foundation", label: "Foundation" },
    { id: "upsc", label: "UPSC" },
  ];

  const fmtDate = (d) => new Date(d).toLocaleString();
  const fmtAvg = (sec) => {
    if (!sec || sec <= 0) return "0.0s";
    if (sec < 60) return `${sec.toFixed(1)}s`;
    const m = Math.floor(sec / 60);
    const s = Math.round(sec % 60);
    return `${m}m ${s}s`;
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4 text-blue-900">Previous Results</h1>
        <div className="flex gap-2 mb-6">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setParams({ track: t.id })}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold border ${
                track === t.id
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-blue-800 border-blue-200 hover:bg-blue-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-blue-700">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-blue-700">No results yet. Take an assessment to see history here.</div>
        ) : (
          <div className="space-y-4">
            {history.map((r, idx) => (
              <button onClick={() => navigate(`/results/${r._id}`)} key={idx} className="w-full text-left bg-white border border-blue-100 rounded-xl p-4 shadow-sm flex justify-between items-center hover:bg-blue-50">
                <div>
                  <div className="text-blue-900 font-semibold">
                    {r.title || (r.track === "upsc" ? "UPSC assessment" : "Aptitude assessment")}
                  </div>
                  <div className="text-blue-600 text-xs">{fmtDate(r.createdAt)}</div>
                  <div className="text-blue-700 text-sm">
                    Marks: <b>{r.correct}/{r.totalQuestions}</b> ({r.totalQuestions ? Math.round((r.correct / r.totalQuestions) * 100) : 0}%) • Wrong: {r.wrong}
                  </div>
                  {r.summary?.overview ? (
                    <div className="text-slate-600 text-xs mt-1 line-clamp-2">{r.summary.overview}</div>
                  ) : null}
                </div>
                <div className="text-blue-800 font-semibold whitespace-nowrap ml-3">Avg: {fmtAvg(r.avgTimeSec)} →</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
