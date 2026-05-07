import { ListOrdered } from "lucide-react";
import type { TocHeading } from "@/lib/content";

interface TableOfContentsProps {
  items: TocHeading[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose my-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm sm:my-10"
    >
      <details className="group">
        <summary className="flex cursor-pointer list-none items-center gap-2 p-5 sm:p-6 [&::-webkit-details-marker]:hidden">
          <ListOrdered size={14} className="text-indigo-400" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            On this page
          </p>
          <svg
            className="ml-auto h-4 w-4 text-slate-500 transition-transform group-open:rotate-180"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>
        <ol className="space-y-2.5 px-5 pb-5 text-sm sm:px-6 sm:pb-6">
          {items.map((h, i) => (
            <li
              key={`${h.id}-${i}`}
              className={h.depth === 3 ? "ml-6" : undefined}
            >
              <a
                href={`#${h.id}`}
                className="group/link flex items-start gap-3 text-slate-400 transition-colors hover:text-white"
              >
                <span className="font-mono text-[10px] font-bold text-indigo-500 group-hover/link:text-indigo-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 leading-snug transition-transform group-hover/link:translate-x-0.5">
                  {h.text}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
