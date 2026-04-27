"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type ThemeMode = "light" | "dark" | "system";

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: "dark",
  setMode: () => {},
});

function applyTheme(mode: ThemeMode) {
  const html = document.documentElement;
  html.classList.remove("light", "dark");

  if (mode === "system") {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    html.classList.add(prefersDark ? "dark" : "light");
  } else {
    html.classList.add(mode);
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("dark");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as ThemeMode | null;
    if (stored) {
      setModeState(stored);
      applyTheme(stored);
    } else {
      applyTheme("dark");
    }

    // Listen for system preference changes
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      const current = (localStorage.getItem("theme") as ThemeMode) || "dark";
      if (current === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  function setMode(newMode: ThemeMode) {
    setModeState(newMode);
    localStorage.setItem("theme", newMode);
    applyTheme(newMode);
  }

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
