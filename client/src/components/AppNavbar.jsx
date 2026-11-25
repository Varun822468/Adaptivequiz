import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home, Dumbbell, ClipboardCheck, BarChart3, BookOpen, Flame, ListChecks,
  Menu, X, User, LogOut, ChevronDown, Sparkles, Landmark, GraduationCap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useLevel } from "../context/LevelContext.jsx";
import UserAvatar from "./UserAvatar.jsx";

const NAV = {
  foundation: [
    { to: "/", label: "Home", icon: Home, end: true },
    { to: "/practice", label: "Practice", icon: Dumbbell },
    { to: "/assessment/selection", label: "Assessment", icon: ClipboardCheck },
    { to: "/results", label: "My Results", icon: BarChart3 },
    { to: "/resources", label: "Resources", icon: BookOpen },
  ],
  upsc: [
    { to: "/", label: "Overview", icon: Home, end: true },
    { to: "/upsc/practice", label: "Practice", icon: Dumbbell },
    { to: "/upsc/assessment", label: "Assessment", icon: ClipboardCheck },
    { to: "/upsc/daily", label: "Daily Challenge", icon: Flame },
    { to: "/upsc/syllabus", label: "Syllabus", icon: ListChecks },
    { to: "/resources", label: "Resources", icon: BookOpen },
  ],
};

export default function AppNavbar() {
  const { level, setLevel } = useLevel();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isUpsc = level === "upsc";
  const [menu, setMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => ref.current && !ref.current.contains(e.target) && setMenu(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);
  useEffect(() => {
    setDrawer(false);
    setMenu(false);
  }, [location.pathname]);

  const switchTo = (l) => {
    if (l === level) return;
    setLevel(l);
    navigate("/");
  };

  const items = NAV[isUpsc ? "upsc" : "foundation"];

  /* ---------- theme tokens ---------- */
  const t = isUpsc
    ? {
        bar: "bg-[#0b1530] border-b-2 border-[#c9a24b] text-white",
        brand: "font-serif tracking-wide text-white",
        sub: "text-[#c9a24b]",
        link: "text-slate-300 hover:text-white",
        active: "text-white border-b-2 border-[#c9a24b]",
        linkBase: "relative px-1 py-5 text-[13px] font-medium tracking-wide uppercase whitespace-nowrap flex items-center gap-1.5 transition-colors border-b-2 border-transparent",
        logo: "bg-[#c9a24b] text-[#0b1530]",
        seg: "bg-white/10",
        segOn: "bg-[#c9a24b] text-[#0b1530]",
        segOff: "text-slate-300 hover:text-white",
        menuBtn: "text-white hover:bg-white/10",
      }
    : {
        bar: "bg-white/90 backdrop-blur border-b border-violet-100 text-slate-800 shadow-sm",
        brand: "font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-500",
        sub: "text-emerald-500",
        link: "text-slate-600 hover:bg-violet-50 hover:text-violet-700",
        active: "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-200",
        linkBase: "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all",
        logo: "bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white",
        seg: "bg-violet-50",
        segOn: "bg-white text-violet-700 shadow",
        segOff: "text-slate-500 hover:text-violet-700",
        menuBtn: "text-slate-700 hover:bg-violet-50",
      };

  const Switcher = () => (
    <div className={`flex p-1 rounded-full ${t.seg}`}>
      {[
        { id: "foundation", label: "Foundation", Icon: GraduationCap },
        { id: "upsc", label: "UPSC", Icon: Landmark },
      ].map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => switchTo(id)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
            level === id ? t.segOn : t.segOff
          }`}
        >
          <Icon size={14} /> {label}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`sticky top-0 z-50 ${t.bar}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <button onClick={() => navigate("/")} className="flex items-center gap-3 shrink-0">
          <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${t.logo}`}>
            <Sparkles size={18} />
          </span>
          <span className="flex flex-col items-start leading-tight">
            <span className={`text-xl ${t.brand}`}>NeuroQuiz</span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.18em] ${t.sub}`}>
              {isUpsc ? "Civil Services Prep" : "Learn · Play · Grow"}
            </span>
          </span>
        </button>

        {/* Desktop links */}
        <nav className={`hidden xl:flex items-center ${isUpsc ? "gap-7" : "gap-1.5"}`}>
          {items.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `${t.linkBase} ${isActive ? t.active : t.link}`}
            >
              {!isUpsc && <Icon size={16} />}
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block"><Switcher /></div>

          <div className="relative" ref={ref}>
            <button
              onClick={() => setMenu((m) => !m)}
              className={`flex items-center gap-2 rounded-full pl-1 pr-2 py-1 transition ${t.menuBtn}`}
              aria-label="Account menu"
            >
              <UserAvatar user={user} size={34} ring={isUpsc ? "ring-2 ring-[#c9a24b]" : "ring-2 ring-violet-300"} />
              <ChevronDown size={15} className={`hidden sm:block transition-transform ${menu ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className="absolute right-0 mt-3 w-64 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
                >
                  <div className="px-4 py-4 flex items-center gap-3 bg-slate-50 border-b border-slate-100">
                    <UserAvatar user={user} size={44} />
                    <div className="min-w-0">
                      <p className="font-bold truncate">{user?.name || "Your account"}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                    </div>
                  </div>
                  <div className="p-2 text-sm font-medium">
                    {[
                      { label: "Profile & Settings", icon: User, to: "/profile" },
                      { label: "My Results", icon: BarChart3, to: `/results?track=${isUpsc ? "upsc" : "foundation"}` },
                      { label: "Change level", icon: Sparkles, to: "/level" },
                    ].map(({ label, icon: Icon, to }) => (
                      <button key={label} onClick={() => navigate(to)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 text-left">
                        <Icon size={16} className="text-slate-500" /> {label}
                      </button>
                    ))}
                    <button onClick={() => navigate("/logout")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600 text-left">
                      <LogOut size={16} /> Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className={`xl:hidden p-2 rounded-lg ${t.menuBtn}`} onClick={() => setDrawer((d) => !d)} aria-label="Menu">
            {drawer ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet drawer */}
      <AnimatePresence>
        {drawer && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="xl:hidden overflow-hidden bg-white text-slate-800 border-t border-slate-100"
          >
            <div className="p-4 space-y-1">
              <div className="md:hidden pb-3"><Switcher /></div>
              {items.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold ${
                      isActive
                        ? isUpsc ? "bg-[#0b1530] text-white" : "bg-violet-600 text-white"
                        : "text-slate-700 hover:bg-slate-100"
                    }`
                  }
                >
                  <Icon size={18} /> {label}
                </NavLink>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
