"use client";

import { useEffect, useRef } from "react";

interface BorderBeamProps {
  colorFrom?: string;
  colorTo?: string;
  duration?: number;
  delay?: number;
}

export function BorderBeam({
  colorFrom = "#a855f7",
  colorTo = "#6366f1",
  duration = 6000,
  delay = 0,
}: BorderBeamProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (startTime === null) startTime = now + delay * 1000;
      const elapsed = Math.max(0, now - startTime);
      const angle = (elapsed / duration) * 360 % 360;
      ref.current?.style.setProperty("--beam-angle", `${angle}deg`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, delay]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: "1.5px",
        background: `conic-gradient(from var(--beam-angle, 0deg), transparent 0%, ${colorFrom} 10%, ${colorTo} 18%, transparent 26%)`,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "destination-out",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        pointerEvents: "none",
      }}
    />
  );
}
