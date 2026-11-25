import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

/**
 * Lets any quiz page tell the floating Whiteboard / Study Chatbot what the
 * student is doing right now.
 *   mode: "practice" | "assessment" | null
 *     - assessment: chatbot is hidden (so graded tests stay fair), whiteboard stays
 *   questionKey / questionText: current question (whiteboard keeps one drawing per question,
 *     chatbot can "explain this question")
 */
const IDLE = { mode: null, questionKey: "general", questionText: "" };

const StudyToolsContext = createContext({ ctx: IDLE, setCtx: () => {} });

export const StudyToolsProvider = ({ children }) => {
  const [ctx, setCtx] = useState(IDLE);
  const value = useMemo(() => ({ ctx, setCtx }), [ctx]);
  return <StudyToolsContext.Provider value={value}>{children}</StudyToolsContext.Provider>;
};

export const useStudyToolsState = () => useContext(StudyToolsContext);

/** Call from a quiz page: useStudyContext({ mode, question }) */
export function useStudyContext({ mode, question }) {
  const { setCtx } = useContext(StudyToolsContext);
  // a fresh id per page visit so drawings from an earlier attempt are not re-shown
  const sessionId = useRef(Math.random().toString(36).slice(2, 8));

  const key = question?.id ?? question?.question ?? null;
  const text = question
    ? [
        question.question,
        ...(Array.isArray(question.options)
          ? question.options.map((o, i) => `${String.fromCharCode(65 + i)}. ${o}`)
          : []),
      ].join("\n")
    : "";

  useEffect(() => {
    setCtx({
      mode,
      questionKey: key ? `${sessionId.current}:${key}` : "general",
      questionText: text,
    });
  }, [mode, key, text, setCtx]);

  useEffect(() => () => setCtx(IDLE), [setCtx]);
}
