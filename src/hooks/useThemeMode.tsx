import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Mode = "dark" | "light";
type Ctx = { mode: Mode; toggle: () => void; setMode: (m: Mode) => void };
const ThemeCtx = createContext<Ctx | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("np_mode")) as Mode | null;
    if (saved === "dark" || saved === "light") setMode(saved);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    if (typeof window !== "undefined") localStorage.setItem("np_mode", mode);
  }, [mode]);

  return (
    <ThemeCtx.Provider
      value={{ mode, setMode, toggle: () => setMode((p) => (p === "dark" ? "light" : "dark")) }}
    >
      {children}
    </ThemeCtx.Provider>
  );
}

export function useThemeMode() {
  const v = useContext(ThemeCtx);
  if (!v) throw new Error("useThemeMode must be used inside ThemeModeProvider");
  return v;
}
