"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";

interface IndexEntry {
  title: string;
  description: string;
  url: string;
  type: string;
  typeLabel: string;
  tags: string[];
  date: string;
  readingTime: number;
}

export function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const basePath = "";

  // Open with Cmd/Ctrl + K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Lazy-load the search index on first open
  useEffect(() => {
    if (!open || index !== null) return;
    setLoading(true);
    fetch(`${basePath}/search-index.json`)
      .then((r) => r.json())
      .then((data) => setIndex(data as IndexEntry[]))
      .catch(() => setIndex([]))
      .finally(() => setLoading(false));
  }, [open, index, basePath]);

  // Focus input when opening
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const results = useMemo(() => {
    if (!index) return [];
    const q = query.trim().toLowerCase();
    if (!q) return index.slice(0, 8);
    const tokens = q.split(/\s+/).filter(Boolean);
    return index
      .map((entry) => {
        const haystack = [
          entry.title,
          entry.description,
          entry.typeLabel,
          ...entry.tags,
        ]
          .join(" ")
          .toLowerCase();
        const score = tokens.reduce((acc, t) => {
          if (!haystack.includes(t)) return -Infinity;
          return acc + (entry.title.toLowerCase().includes(t) ? 3 : 1);
        }, 0);
        return { entry, score };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((r) => r.entry);
  }, [query, index]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white md:h-auto md:w-auto md:gap-2 md:px-3 md:py-1.5"
        aria-label="Open search"
      >
        <Search size={16} />
        <span className="hidden text-xs font-medium text-slate-400 md:inline">
          Search
        </span>
        <kbd className="hidden rounded border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 md:inline">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-950/80 px-4 pt-20 backdrop-blur-md"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 shadow-2xl shadow-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-white/10 p-5">
              <Search size={18} className="shrink-0 text-indigo-400" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tools, glossary…"
                className="flex-1 bg-transparent text-base text-white placeholder-slate-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-slate-500 transition-colors hover:text-white"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {loading && (
                <div className="flex items-center justify-center gap-2 py-12 text-sm text-slate-500">
                  <Loader2 className="h-4 w-4 animate-spin" /> Loading index…
                </div>
              )}
              {!loading && results.length === 0 && (
                <div className="py-12 text-center text-sm text-slate-500">
                  {query
                    ? `No matches for "${query}"`
                    : "Start typing to search."}
                </div>
              )}
              {!loading && results.length > 0 && (
                <ul className="divide-y divide-white/5">
                  {results.map((r) => (
                    <li key={r.url}>
                      <Link
                        href={r.url}
                        onClick={() => setOpen(false)}
                        className="group flex flex-col gap-1.5 px-5 py-4 transition-colors hover:bg-white/[0.04]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="rounded-full border border-indigo-400/30 bg-indigo-500/15 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.15em] text-indigo-300">
                            {r.typeLabel}
                          </span>
                          <span className="font-serif text-lg text-white group-hover:text-indigo-300">
                            {r.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <p className="line-clamp-1 flex-1 text-sm text-slate-400">
                            {r.description}
                          </p>
                          <span className="shrink-0 text-[10px] uppercase tracking-[0.15em] text-slate-600">
                            {r.readingTime} min
                          </span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-white/10 px-5 py-3 text-[10px] uppercase tracking-[0.15em] text-slate-600">
              <span>
                Press{" "}
                <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5">
                  Esc
                </kbd>{" "}
                to close
              </span>
              <span>SleepingOnTheEdge</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
