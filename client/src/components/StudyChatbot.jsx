import { useEffect, useRef, useState } from "react";
import { Send, Trash2, X, Sparkles } from "lucide-react";
import api from "../lib/api";
import { loadJSON, saveJSON } from "../lib/storage";
import { useAuth } from "../context/AuthContext.jsx";

const SUGGESTIONS = [
  "Explain Fundamental Rights vs Directive Principles",
  "Make a 7-day revision plan for UPSC Polity",
  "Tips to improve speed in CSAT reasoning",
  "How do I remember the Indian rivers and their tributaries?",
];

// --- very small, safe markdown renderer (bold, `code`, lists, headings, code blocks) ---
const inline = (text, keyPrefix) =>
  text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4)
      return <strong key={`${keyPrefix}-${i}`}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2)
      return (
        <code key={`${keyPrefix}-${i}`} className="px-1 rounded bg-slate-200 text-[0.85em]">
          {part.slice(1, -1)}
        </code>
      );
    return part;
  });

function Markdown({ text }) {
  const blocks = [];
  const lines = text.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim().startsWith("```")) {
      const code = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push(
        <pre key={blocks.length} className="bg-slate-800 text-slate-100 rounded-lg p-2 text-xs overflow-x-auto">
          {code.join("\n")}
        </pre>
      );
    } else if (/^\s*[-*•]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*•]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*[-*•]\s+/, ""));
      blocks.push(
        <ul key={blocks.length} className="list-disc pl-5 space-y-0.5">
          {items.map((t, k) => <li key={k}>{inline(t, `${blocks.length}-${k}`)}</li>)}
        </ul>
      );
    } else if (/^\s*\d+[.)]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) items.push(lines[i++].replace(/^\s*\d+[.)]\s+/, ""));
      blocks.push(
        <ol key={blocks.length} className="list-decimal pl-5 space-y-0.5">
          {items.map((t, k) => <li key={k}>{inline(t, `${blocks.length}-${k}`)}</li>)}
        </ol>
      );
    } else if (/^#{1,4}\s+/.test(line)) {
      blocks.push(
        <p key={blocks.length} className="font-bold">
          {inline(line.replace(/^#{1,4}\s+/, ""), `${blocks.length}`)}
        </p>
      );
      i++;
    } else if (line.trim() === "") {
      i++;
    } else {
      const para = [];
      while (
        i < lines.length &&
        lines[i].trim() !== "" &&
        !/^\s*([-*•]|\d+[.)])\s+/.test(lines[i]) &&
        !/^#{1,4}\s+/.test(lines[i]) &&
        !lines[i].trim().startsWith("```")
      )
        para.push(lines[i++]);
      blocks.push(<p key={blocks.length}>{inline(para.join(" "), `${blocks.length}`)}</p>);
    }
  }
  return <div className="space-y-2 text-sm leading-relaxed">{blocks}</div>;
}

export default function StudyChatbot({ open, onClose, questionText = "", canAskAboutQuestion = false }) {
  const { user } = useAuth();
  const storageKey = `studybuddy:chat:${user?.id || user?._id || "guest"}`;
  const [messages, setMessages] = useState(() => loadJSON(storageKey, []));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // reload history if the logged-in user changes
  useEffect(() => {
    setMessages(loadJSON(storageKey, []));
  }, [storageKey]);

  useEffect(() => {
    saveJSON(storageKey, messages.slice(-40));
  }, [messages, storageKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const send = async (text, withContext = false) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const { data } = await api.post("/api/chat", {
        messages: next.map(({ role, content }) => ({ role, content })),
        context: withContext ? questionText : undefined,
      });
      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (err) {
      const d = err?.response?.data;
      const msg = d?.message
        ? d.message + (d.detail ? `\n\n${d.detail}` : "")
        : "Could not reach the study assistant. Check that the server is running.";
      setMessages((m) => [...m, { role: "assistant", content: msg, error: true }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed z-50 inset-0 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-[420px] sm:h-[min(640px,calc(100vh-2rem))] bg-white sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden ${
        open ? "" : "hidden"
      }`}
      role="dialog"
      aria-label="Study assistant"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white">
        <div className="flex items-center gap-2">
          <Sparkles size={18} />
          <div>
            <div className="font-bold leading-tight">Study Assistant</div>
            <div className="text-[11px] text-white/80 leading-tight">Ask anything about your studies</div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={() => window.confirm("Clear this conversation?") && setMessages([])}
              className="p-1.5 rounded hover:bg-white/20"
              aria-label="Clear chat"
              title="Clear chat"
            >
              <Trash2 size={17} />
            </button>
          )}
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/20" aria-label="Close chat">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-3 space-y-3 bg-slate-50">
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="bg-white border border-slate-200 rounded-xl p-3 text-sm text-slate-700">
              Hi{user?.name ? ` ${user.name.split(" ")[0]}` : ""}! I can explain concepts, solve practice
              questions step by step, plan your UPSC preparation and share study techniques.
            </div>
            <div className="flex flex-col gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-left text-sm bg-white border border-violet-200 text-violet-800 rounded-xl px-3 py-2 hover:bg-violet-50"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[88%] rounded-2xl px-3 py-2 ${
                m.role === "user"
                  ? "bg-violet-600 text-white text-sm whitespace-pre-wrap"
                  : m.error
                  ? "bg-red-50 text-red-700 border border-red-200 text-sm whitespace-pre-wrap break-words"
                  : "bg-white text-slate-800 border border-slate-200"
              }`}
            >
              {m.role === "assistant" && !m.error ? <Markdown text={m.content} /> : m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-2xl px-3 py-2 text-sm text-slate-500">
              <span className="inline-flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:120ms]" />
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:240ms]" />
              </span>
            </div>
          </div>
        )}
        <div ref={endRef} />
      </div>

      <div className="border-t border-slate-200 bg-white p-2">
        {canAskAboutQuestion && questionText && (
          <button
            onClick={() => send("Explain this question and how to solve it, step by step.", true)}
            disabled={loading}
            className="mb-2 w-full text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 hover:bg-amber-100 disabled:opacity-50"
          >
            💡 Explain the question I'm on
          </button>
        )}
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            rows={1}
            maxLength={2000}
            placeholder="Ask a study question…"
            className="flex-1 resize-none max-h-28 border border-slate-300 rounded-xl px-3 py-2 text-sm outline-none focus:border-violet-500"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40"
            aria-label="Send"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}