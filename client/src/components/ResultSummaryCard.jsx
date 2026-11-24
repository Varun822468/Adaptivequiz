/**
 * Shows the generated performance summary for a result.
 * status: "saving" | "summarising" | "done" | "error" | "idle"
 */
const List = ({ title, items, tone }) =>
  items?.length ? (
    <div className={`rounded-xl p-3 ${tone}`}>
      <div className="font-bold text-sm mb-1">{title}</div>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {items.map((t, i) => (
          <li key={i}>{t}</li>
        ))}
      </ul>
    </div>
  ) : null;

export default function ResultSummaryCard({ summary, status = "done", error = "", onRetry, onRegenerate }) {
  if (status === "saving" || status === "summarising") {
    return (
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-4 text-sm text-violet-800 flex items-center gap-3">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-violet-600" />
        {status === "saving" ? "Saving your marks…" : "Marks saved. Writing your performance summary…"}
      </div>
    );
  }

  if (status === "error" || !summary?.overview) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
        <div>{error || "Summary is not available yet."}</div>
        {onRetry && (
          <button onClick={onRetry} className="mt-2 px-3 py-1.5 bg-red-600 text-white rounded-lg font-semibold">
            Try again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-violet-200 rounded-xl p-4 md:p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-lg font-bold text-slate-900">📝 Performance Summary</h3>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
          {summary.generatedBy === "ai" ? "AI generated" : "Auto summary"}
        </span>
      </div>
      <p className="text-sm text-slate-700 mb-3 leading-relaxed">{summary.overview}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <List title="💪 Strengths" items={summary.strengths} tone="bg-green-50 text-green-900" />
        <List title="⚠️ Needs work" items={summary.weaknesses} tone="bg-red-50 text-red-900" />
      </div>
      <div className="mt-3">
        <List title="🎯 Next steps" items={summary.nextSteps} tone="bg-blue-50 text-blue-900" />
      </div>
      {summary.focusTopics?.length ? (
        <div className="mt-3 flex flex-wrap gap-2">
          {summary.focusTopics.map((t, i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold">
              Revise: {t}
            </span>
          ))}
        </div>
      ) : null}
      {onRegenerate && (
        <button onClick={onRegenerate} className="mt-3 text-xs font-semibold text-violet-700 hover:underline">
          Regenerate summary
        </button>
      )}
    </div>
  );
}
