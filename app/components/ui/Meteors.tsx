"use client";

import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";

interface MeteorData {
  id: number;
  left: string;
  top: string;
  delay: string;
  duration: string;
}

interface MeteorsProps {
  number?: number;
}

export function Meteors({ number = 20 }: MeteorsProps) {
  const [meteors, setMeteors] = useState<MeteorData[]>([]);
  const { mode } = useTheme();

  // Resolve actual theme (system → check media query)
  const [isLight, setIsLight] = useState(false);
  useEffect(() => {
    if (mode === "light") {
      setIsLight(true);
    } else if (mode === "dark") {
      setIsLight(false);
    } else {
      setIsLight(!window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
  }, [mode]);

  useEffect(() => {
    setMeteors(
      Array.from({ length: number }, (_, i) => ({
        id: i,
        left: `${Math.floor(Math.random() * 110)}%`,
        top: `${Math.floor(Math.random() * 40)}%`,
        delay: `${(Math.random() * 4).toFixed(2)}s`,
        duration: `${(Math.random() * 5 + 4).toFixed(2)}s`,
      })),
    );
  }, [number]);

  const dotColor      = isLight ? "rgba(30, 30, 50, 0.85)"  : "white";
  const glowColor     = isLight ? "rgba(30, 30, 50, 0.25)"  : "rgba(255,255,255,0.4)";
  const trailColorA   = isLight ? "rgba(30, 30, 50, 0.7)"   : "rgba(255,255,255,0.8)";

  return (
    <>
      {meteors.map((m) => (
        <span
          key={m.id}
          style={{
            position: "absolute",
            top: m.top,
            left: m.left,
            width: "2px",
            height: "2px",
            borderRadius: "9999px",
            backgroundColor: dotColor,
            boxShadow: `0 0 6px 2px ${glowColor}`,
            transform: "rotate(215deg)",
            pointerEvents: "none",
            animationName: "meteor",
            animationDelay: m.delay,
            animationDuration: m.duration,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              width: "100px",
              height: "1px",
              background: `linear-gradient(to right, ${trailColorA}, transparent)`,
            }}
          />
        </span>
      ))}
    </>
  );
}

