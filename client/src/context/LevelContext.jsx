import { createContext, useContext, useMemo, useState } from "react";

const LevelContext = createContext(null);
const KEY = "prepLevel";

export const LEVELS = {
  foundation: { id: "foundation", label: "Foundation Level", sub: "Low level preparation", home: "/" },
  upsc: { id: "upsc", label: "High Level (UPSC)", sub: "High level preparation", home: "/" },
};

export const LevelProvider = ({ children }) => {
  const [level, setLevelState] = useState(() => {
    const v = localStorage.getItem(KEY);
    return v === "foundation" || v === "upsc" ? v : null;
  });

  const setLevel = (l) => {
    if (l === "foundation" || l === "upsc") {
      localStorage.setItem(KEY, l);
      setLevelState(l);
    }
  };
  const clearLevel = () => {
    localStorage.removeItem(KEY);
    setLevelState(null);
  };

  const value = useMemo(() => ({ level, setLevel, clearLevel }), [level]);
  return <LevelContext.Provider value={value}>{children}</LevelContext.Provider>;
};

export const useLevel = () => {
  const ctx = useContext(LevelContext);
  if (!ctx) throw new Error("useLevel must be used within LevelProvider");
  return ctx;
};
