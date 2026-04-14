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
      className="not-prose my-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-5 backdrop-blur-sm sm:my-10 sm:p-6"
    >
      <div className="flex items-center gap-2">
        <ListOrdered size={14} className="text-indigo-400" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
          On this page
        </p>
      </div>
      <ol className="mt-4 space-y-2.5 text-sm">
        {items.map((h, i) => (
          <li
            key={`${h.id}-${i}`}
            className={h.depth === 3 ? "ml-6" : undefined}
          >
            <a
              href={`#${h.id}`}
              className="group flex items-start gap-3 text-slate-400 transition-colors hover:text-white"
            >
              <span className="font-mono text-[10px] font-bold text-indigo-500 group-hover:text-indigo-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 leading-snug group-hover:translate-x-0.5 transition-transform">
                {h.text}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
