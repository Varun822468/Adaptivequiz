import { useCallback, useEffect, useRef, useState } from "react";
import {
  Pencil,
  Eraser,
  Type,
  Undo2,
  Redo2,
  Trash2,
  Download,
  Maximize2,
  Minimize2,
  Grid3x3,
  X,
} from "lucide-react";

const COLORS = ["#111827", "#2563eb", "#dc2626", "#16a34a", "#d97706"];
const SIZES = [2, 4, 8];
const MAX_UNDO = 30;

const copyCanvas = (src) => {
  const c = document.createElement("canvas");
  c.width = src.width;
  c.height = src.height;
  c.getContext("2d").drawImage(src, 0, 0);
  return c;
};

/**
 * Scratch whiteboard for working out answers.
 * - Works with mouse, pen and touch (Pointer Events), so a touch-screen laptop
 *   can use finger/stylus while everyone else uses the mouse.
 * - Keyboard: P pen, E eraser, T text (click, type, Enter), Ctrl+Z undo, Ctrl+Y redo, Esc close.
 * - Keeps a separate drawing for every question.
 */
export default function Whiteboard({ open, onClose, questionKey = "general", questionText = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const drawing = useRef(null);
  const undoStack = useRef([]);
  const redoStack = useRef([]);
  const store = useRef({});
  const keyRef = useRef(questionKey);

  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState(COLORS[0]);
  const [size, setSize] = useState(4);
  const [expanded, setExpanded] = useState(false);
  const [grid, setGrid] = useState(false);
  const [textBox, setTextBoxState] = useState(null); // { x, y, value }
  const textBoxRef = useRef(null);
  const setTextBox = (v) => {
    const next = typeof v === "function" ? v(textBoxRef.current) : v;
    textBoxRef.current = next;
    setTextBoxState(next);
  };
  const [, bump] = useState(0); // re-render so undo/redo buttons update

  const hasTouch = typeof navigator !== "undefined" && navigator.maxTouchPoints > 0;

  const dpr = () => window.devicePixelRatio || 1;

  const restore = useCallback((img) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    ctx.clearRect(0, 0, c.width, c.height);
    if (img) ctx.drawImage(img, 0, 0);
    ctx.restore();
  }, []);

  const pushUndo = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    undoStack.current.push(copyCanvas(c));
    if (undoStack.current.length > MAX_UNDO) undoStack.current.shift();
    redoStack.current = [];
    bump((n) => n + 1);
  }, []);

  // Keep the canvas sharp and sized to its container, preserving what is drawn
  useEffect(() => {
    const wrap = wrapRef.current;
    const c = canvasRef.current;
    if (!wrap || !c) return;
    const ro = new ResizeObserver(() => {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      if (w < 10 || h < 10) return; // hidden
      const ratio = dpr();
      const nw = Math.round(w * ratio);
      const nh = Math.round(h * ratio);
      if (c.width === nw && c.height === nh) return;
      const old = c.width > 0 && c.height > 0 ? copyCanvas(c) : null;
      c.width = nw;
      c.height = nh;
      c.style.width = `${w}px`;
      c.style.height = `${h}px`;
      if (old) c.getContext("2d").drawImage(old, 0, 0);
    });
    ro.observe(wrap);
    return () => ro.disconnect();
  }, []);

  // One drawing per question
  useEffect(() => {
    if (keyRef.current === questionKey) return;
    const c = canvasRef.current;
    if (c && c.width) store.current[keyRef.current] = copyCanvas(c);
    keyRef.current = questionKey;
    restore(store.current[questionKey] || null);
    undoStack.current = [];
    redoStack.current = [];
    setTextBox(null);
    bump((n) => n + 1);
  }, [questionKey, restore]);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const strokeSegment = (from, to, pressure) => {
    const ctx = canvasRef.current.getContext("2d");
    const ratio = dpr();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = size * 4;
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = color;
      ctx.lineWidth = size * pressure;
    }
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.globalCompositeOperation = "source-over";
  };

  const pressureOf = (e) =>
    e.pointerType === "pen" && e.pressure > 0 ? 0.4 + e.pressure * 1.2 : 1;

  const commitText = () => {
    const box = textBoxRef.current;
    if (!box) return;
    setTextBox(null); // clear first so blur + click can never commit twice
    const value = box.value;
    if (!value.trim()) return;
    pushUndo();
    const ctx = canvasRef.current.getContext("2d");
    const ratio = dpr();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    const fontPx = size * 5 + 12;
    ctx.font = `${fontPx}px system-ui, sans-serif`;
    ctx.fillStyle = color;
    ctx.textBaseline = "top";
    value.split("\n").forEach((line, i) => ctx.fillText(line, box.x, box.y + i * fontPx * 1.25));
  };

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (tool === "text") {
      e.preventDefault();
      commitText();
      const p = pos(e);
      setTextBox({ x: p.x, y: p.y, value: "" });
      return;
    }
    if (drawing.current) return; // ignore a second finger while drawing
    e.currentTarget.setPointerCapture(e.pointerId);
    pushUndo();
    const p = pos(e);
    drawing.current = { id: e.pointerId, last: p };
    strokeSegment(p, { x: p.x + 0.01, y: p.y }, pressureOf(e));
  };

  const onPointerMove = (e) => {
    const d = drawing.current;
    if (!d || d.id !== e.pointerId) return;
    const events = e.nativeEvent.getCoalescedEvents?.() || [e.nativeEvent];
    const r = canvasRef.current.getBoundingClientRect();
    events.forEach((ev) => {
      const p = { x: ev.clientX - r.left, y: ev.clientY - r.top };
      strokeSegment(d.last, p, pressureOf(e));
      d.last = p;
    });
  };

  const endStroke = (e) => {
    if (drawing.current?.id === e.pointerId) {
      drawing.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  const undo = useCallback(() => {
    const c = canvasRef.current;
    if (!c || undoStack.current.length === 0) return;
    redoStack.current.push(copyCanvas(c));
    restore(undoStack.current.pop());
    bump((n) => n + 1);
  }, [restore]);

  const redo = useCallback(() => {
    const c = canvasRef.current;
    if (!c || redoStack.current.length === 0) return;
    undoStack.current.push(copyCanvas(c));
    restore(redoStack.current.pop());
    bump((n) => n + 1);
  }, [restore]);

  const clearAll = () => {
    pushUndo();
    restore(null);
    setTextBox(null);
  };

  const download = () => {
    const c = canvasRef.current;
    const out = document.createElement("canvas");
    out.width = c.width;
    out.height = c.height;
    const ctx = out.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, out.width, out.height);
    ctx.drawImage(c, 0, 0);
    out.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `whiteboard-${Date.now()}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  };

  // Keyboard shortcuts (only while open and not typing in a field)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const mod = e.ctrlKey || e.metaKey;
      const k = e.key.toLowerCase();
      if (mod && k === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (mod && (k === "y" || (k === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      } else if (!mod && !e.altKey) {
        if (k === "p") setTool("pen");
        else if (k === "e") setTool("eraser");
        else if (k === "t") setTool("text");
        else if (k === "escape") onClose?.();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, undo, redo, onClose]);

  const btn = (active) =>
    `p-2 rounded-lg border text-sm transition ${
      active
        ? "bg-violet-600 text-white border-violet-600"
        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
    }`;
  const iconBtn =
    "p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed";

  const panelPos = expanded
    ? "inset-2 sm:inset-4"
    : "inset-0 sm:inset-auto sm:right-4 sm:bottom-4 sm:w-[min(760px,calc(100vw-2rem))] sm:h-[min(620px,calc(100vh-2rem))]";

  return (
    <div
      className={`fixed z-50 ${panelPos} bg-white sm:rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden ${
        open ? "" : "hidden"
      }`}
      role="dialog"
      aria-label="Whiteboard"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white">
        <div className="font-bold text-sm sm:text-base">✏️ Whiteboard</div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="hidden sm:block p-1.5 rounded hover:bg-white/20"
            aria-label={expanded ? "Shrink whiteboard" : "Expand whiteboard"}
          >
            {expanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
          </button>
          <button onClick={onClose} className="p-1.5 rounded hover:bg-white/20" aria-label="Close whiteboard">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-50">
        <button className={btn(tool === "pen")} onClick={() => setTool("pen")} title="Pen (P)" aria-label="Pen">
          <Pencil size={18} />
        </button>
        <button className={btn(tool === "eraser")} onClick={() => setTool("eraser")} title="Eraser (E)" aria-label="Eraser">
          <Eraser size={18} />
        </button>
        <button className={btn(tool === "text")} onClick={() => setTool("text")} title="Type text (T)" aria-label="Text">
          <Type size={18} />
        </button>

        <span className="w-px h-6 bg-slate-300 mx-1" />

        {COLORS.map((c) => (
          <button
            key={c}
            onClick={() => {
              setColor(c);
              if (tool === "eraser") setTool("pen");
            }}
            style={{ backgroundColor: c }}
            className={`w-6 h-6 rounded-full border-2 ${
              color === c && tool !== "eraser" ? "border-violet-500 ring-2 ring-violet-200" : "border-white shadow"
            }`}
            aria-label={`Colour ${c}`}
          />
        ))}

        <span className="w-px h-6 bg-slate-300 mx-1" />

        {SIZES.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center ${
              size === s ? "border-violet-500 bg-violet-50" : "border-slate-200 bg-white"
            }`}
            aria-label={`Size ${s}`}
          >
            <span className="rounded-full bg-slate-800" style={{ width: s + 3, height: s + 3 }} />
          </button>
        ))}

        <span className="w-px h-6 bg-slate-300 mx-1" />

        <button className={iconBtn} onClick={undo} disabled={undoStack.current.length === 0} title="Undo (Ctrl+Z)" aria-label="Undo">
          <Undo2 size={18} />
        </button>
        <button className={iconBtn} onClick={redo} disabled={redoStack.current.length === 0} title="Redo (Ctrl+Y)" aria-label="Redo">
          <Redo2 size={18} />
        </button>
        <button className={btn(grid)} onClick={() => setGrid((g) => !g)} title="Grid" aria-label="Toggle grid">
          <Grid3x3 size={18} />
        </button>
        <button className={iconBtn} onClick={clearAll} title="Clear board" aria-label="Clear board">
          <Trash2 size={18} />
        </button>
        <button className={iconBtn} onClick={download} title="Save as image" aria-label="Download image">
          <Download size={18} />
        </button>
      </div>

      {/* Current question (so you can see it while the board covers the page) */}
      {questionText ? (
        <details className="border-b border-slate-200 bg-amber-50 px-3 py-1.5 text-xs sm:text-sm text-slate-700" open>
          <summary className="cursor-pointer font-semibold text-amber-800 select-none">Current question</summary>
          <div className="mt-1 whitespace-pre-line max-h-28 overflow-y-auto">{questionText}</div>
        </details>
      ) : null}

      {/* Canvas */}
      <div
        ref={wrapRef}
        className="relative flex-1 min-h-0 bg-white"
        style={
          grid
            ? {
                backgroundImage:
                  "linear-gradient(#e2e8f0 1px, transparent 1px), linear-gradient(90deg, #e2e8f0 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }
            : undefined
        }
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 select-none"
          style={{
            touchAction: "none",
            cursor: tool === "text" ? "text" : tool === "eraser" ? "cell" : "crosshair",
          }}
          onMouseDown={(e) => {
            // keep focus in the text box while placing a new one (prevents a double commit via blur)
            if (tool === "text") e.preventDefault();
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endStroke}
          onPointerCancel={endStroke}
          onPointerLeave={(e) => {
            // keep drawing if the pointer is captured; otherwise stop
            if (!e.currentTarget.hasPointerCapture?.(e.pointerId)) endStroke(e);
          }}
        />
        {textBox && (
          <textarea
            autoFocus
            value={textBox.value}
            onChange={(e) => setTextBox((t) => ({ ...t, value: e.target.value }))}
            onBlur={commitText}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                commitText();
              } else if (e.key === "Escape") {
                e.preventDefault();
                setTextBox(null);
              }
            }}
            rows={1}
            placeholder="Type, then Enter"
            className="absolute bg-white/80 border border-dashed border-violet-400 rounded outline-none p-0.5 resize-none"
            style={{
              left: textBox.x,
              top: textBox.y,
              color,
              fontSize: size * 5 + 12,
              lineHeight: 1.25,
              minWidth: 140,
              maxWidth: "80%",
            }}
          />
        )}
      </div>

      {/* Footer hint */}
      <div className="px-3 py-1.5 text-[11px] sm:text-xs text-slate-500 bg-slate-50 border-t border-slate-200">
        {hasTouch
          ? "Touch screen / pen detected: draw with your finger or stylus, or use the mouse. "
          : "Draw with your mouse. "}
        Press <b>T</b> to type with the keyboard (Enter to place). <b>Ctrl+Z</b> undo.
      </div>
    </div>
  );
}
