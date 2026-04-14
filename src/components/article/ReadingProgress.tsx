"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      className="fixed left-0 top-0 z-[60] h-1 w-full bg-transparent"
    >
      <div
        className="h-full bg-gradient-to-r from-indigo-500 via-indigo-400 to-amber-300 shadow-[0_0_12px_rgba(99,102,241,0.6)] transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
