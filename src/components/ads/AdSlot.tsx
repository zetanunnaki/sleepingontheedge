"use client";

import { useEffect, useRef } from "react";

interface AdSlotProps {
  /** Your AdSense ad slot ID, e.g. "1234567890" */
  slot: string;
  /** Ad format — "horizontal" for leaderboard-style, "auto" for responsive */
  format?: "horizontal" | "auto";
  /** Position label shown when ad isn't loaded yet — keeps the space from collapsing */
  position?: "top" | "bottom" | "article";
}

export function AdSlot({
  slot,
  format = "auto",
  position = "top",
}: AdSlotProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      // @ts-expect-error — adsbygoogle is injected globally
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet — ad will show when script loads
    }
  }, []);

  const heightClass =
    format === "horizontal"
      ? "min-h-[90px] sm:min-h-[90px]"
      : "min-h-[100px] sm:min-h-[250px]";

  return (
    <div
      className={`relative mx-auto w-full max-w-6xl px-5 sm:px-6 md:px-10 ${
        position === "top" ? "pt-2 pb-4" : "pt-4 pb-2"
      }`}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] ${heightClass} flex items-center justify-center`}
      >
        <ins
          ref={adRef}
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format={format === "horizontal" ? "horizontal" : "auto"}
          data-full-width-responsive="true"
        />
        {/* Subtle placeholder visible before ad loads — disappears once AdSense injects content */}
        <noscript>
          <div className="flex h-full items-center justify-center text-[10px] uppercase tracking-[0.2em] text-slate-700">
            Advertisement
          </div>
        </noscript>
      </div>
    </div>
  );
}
