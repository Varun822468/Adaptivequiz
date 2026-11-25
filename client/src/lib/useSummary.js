import { useEffect, useState } from "react";
import api from "./api";

// Per-level dashboard numbers from /api/results/summary
export default function useSummary(track) {
  const [summary, setSummary] = useState({
    totalAssessments: 0,
    totalCorrect: 0,
    totalWrong: 0,
    avgTimeSec: 0,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const { data } = await api.get(`/api/results/summary?track=${track}`);
        if (alive) setSummary((s) => ({ ...s, ...data.summary }));
      } catch {
        /* keep zeros */
      } finally {
        if (alive) setLoaded(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [track]);

  return { summary, loaded };
}

export const fmtAvg = (sec = 0) => {
  const s = Math.round(sec);
  if (!s) return "0s";
  return s >= 60 ? `${Math.floor(s / 60)}m ${s % 60}s` : `${s}s`;
};
