"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-indigo-500/40 hover:text-white lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <Menu size={18} />
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-[100] flex flex-col bg-slate-950/95 backdrop-blur-xl"
          style={{ animation: "fadeSlideIn 0.25s ease-out" }}
        >
          <div
            aria-hidden
            className="bg-dotgrid pointer-events-none absolute inset-0 opacity-30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-[-20%] top-[-10%] h-[400px] w-[400px] rounded-full bg-indigo-600/10 blur-[120px]"
          />
          <div className="relative flex items-center justify-between px-6 py-6">
            <span className="font-serif text-xl font-bold text-white">
              Sleeping<span className="text-indigo-400">OnThe</span>Edge
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-indigo-500/40 hover:text-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="relative flex flex-1 flex-col gap-2 overflow-y-auto px-6 py-6"
          >
            {siteConfig.nav.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="animate-fade-up group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 font-serif text-xl text-white backdrop-blur-sm transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300 sm:py-5 sm:text-2xl"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                {item.label}
                <span className="text-indigo-500 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            ))}
            <div className="mt-6 grid grid-cols-2 gap-2">
              <Link
                href="/glossary"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white"
              >
                Glossary
              </Link>
              <Link
                href="/methodology"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white"
              >
                Methodology
              </Link>
              <Link
                href="/about"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white"
              >
                About
              </Link>
              <Link
                href="/disclaimer"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.15em] text-slate-300 hover:text-white"
              >
                Disclaimer
              </Link>
            </div>
          </nav>

          <div className="px-6 pb-10">
            <Link
              href="/tools/sleep-edge-quiz"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-indigo-600 px-6 py-4 text-center text-base font-bold text-white shadow-xl shadow-indigo-500/20"
            >
              Take the Sleep Quiz
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
