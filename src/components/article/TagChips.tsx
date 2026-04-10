import Link from "next/link";
import { Tag } from "lucide-react";
import { tagSlug } from "@/lib/content";

interface TagChipsProps {
  tags: string[];
  size?: "sm" | "md";
  showIcon?: boolean;
}

export function TagChips({
  tags,
  size = "md",
  showIcon = false,
}: TagChipsProps) {
  if (!tags || tags.length === 0) return null;
  const padding = size === "sm" ? "px-2.5 py-1" : "px-3 py-1.5";
  const text = size === "sm" ? "text-[10px]" : "text-xs";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {showIcon && <Tag size={12} className="text-slate-500" />}
      {tags.map((t) => (
        <Link
          key={t}
          href={`/tags/${tagSlug(t)}`}
          className={`inline-flex items-center rounded-full border border-white/10 bg-white/5 ${padding} ${text} font-semibold uppercase tracking-[0.12em] text-slate-300 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-300`}
        >
          {t}
        </Link>
      ))}
    </div>
  );
}
