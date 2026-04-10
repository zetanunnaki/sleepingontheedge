import type { TocHeading } from "@/lib/content";

interface TableOfContentsProps {
  items: TocHeading[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  if (items.length < 3) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose my-10 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
    >
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
        On this page
      </p>
      <ol className="mt-4 space-y-2 text-sm">
        {items.map((h, i) => (
          <li
            key={`${h.id}-${i}`}
            className={h.depth === 3 ? "ml-5" : undefined}
          >
            <a
              href={`#${h.id}`}
              className="flex gap-2 text-slate-400 transition-colors hover:text-white"
            >
              <span className="text-indigo-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{h.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
