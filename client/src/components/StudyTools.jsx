import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, PenTool } from "lucide-react";
import Whiteboard from "./Whiteboard.jsx";
import StudyChatbot from "./StudyChatbot.jsx";
import { useStudyToolsState } from "./StudyToolsContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

/**
 * Floating Whiteboard + Study Assistant launchers. Mounted once in App so the
 * chat and drawings survive page changes. Only one panel is open at a time.
 * During a graded assessment (mode === "assessment") the chatbot is hidden.
 */
export default function StudyTools() {
  const { token } = useAuth();
  const { pathname } = useLocation();
  const { ctx } = useStudyToolsState();
  const [open, setOpen] = useState(null); // null | "board" | "chat"

  const chatAllowed = ctx.mode !== "assessment";

  useEffect(() => {
    if (!chatAllowed && open === "chat") setOpen(null);
  }, [chatAllowed, open]);

  if (!token || pathname.startsWith("/user/auth") || pathname === "/logout") return null;

  const pill =
    "flex items-center gap-2 px-4 py-3 rounded-full shadow-xl font-bold text-sm text-white transition hover:scale-105 active:scale-95";

  return (
    <>
      {open === null && (
        <div className="fixed z-40 right-4 bottom-24 lg:bottom-6 flex flex-col items-end gap-3 print:hidden">
          <button
            onClick={() => setOpen("board")}
            className={`${pill} bg-gradient-to-r from-violet-600 to-purple-600`}
            aria-label="Open whiteboard"
          >
            <PenTool size={18} />
            <span className="hidden sm:inline">Whiteboard</span>
          </button>
          {chatAllowed && (
            <button
              onClick={() => setOpen("chat")}
              className={`${pill} bg-gradient-to-r from-blue-600 to-violet-600`}
              aria-label="Open study assistant"
            >
              <MessageCircle size={18} />
              <span className="hidden sm:inline">Study Assistant</span>
            </button>
          )}
        </div>
      )}

      <Whiteboard
        open={open === "board"}
        onClose={() => setOpen(null)}
        questionKey={ctx.questionKey}
        questionText={ctx.questionText}
      />
      <StudyChatbot
        open={open === "chat"}
        onClose={() => setOpen(null)}
        questionText={ctx.questionText}
        canAskAboutQuestion={ctx.mode === "practice"}
      />
    </>
  );
}
