"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const STORAGE_KEY = "soe-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true);
    } catch {
      // localStorage unavailable (private mode, etc.) — skip
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: true, at: Date.now() }));
    } catch {}
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ accepted: false, at: Date.now() }));
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[100] border-t border-white/10 bg-slate-950/95 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-4 sm:px-6 sm:py-5 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="flex-1 text-sm leading-relaxed text-slate-300">
          <p>
            We use essential cookies for site functionality and optional
            analytics cookies to understand how readers use the site. We
            don&apos;t sell your data. Read our{" "}
            <Link
              href="/privacy-policy"
              className="text-indigo-400 underline-offset-2 hover:text-white hover:underline"
            >
              privacy policy
            </Link>
            {" "}for details.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={decline}
            className="rounded-full border border-white/20 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-slate-300 transition-colors hover:border-white/40 hover:text-white"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={accept}
            className="rounded-full bg-indigo-500 px-5 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-indigo-400"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={decline}
            aria-label="Close cookie notice"
            className="text-slate-500 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
