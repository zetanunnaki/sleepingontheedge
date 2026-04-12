import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { CoverFallback } from "./CoverFallback";

const TYPE_LABEL: Record<string, string> = {
  roundups: "Edge Pick",
  reviews: "Lab Report",
  guides: "Protocol",
};

interface ArticleCardProps {
  item: ContentItem;
}

export function ArticleCard({ item }: ArticleCardProps) {
  return (
    <Link
      href={item.url}
      className="group flex flex-col overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        {item.frontmatter.featuredImage ? (
          <Image
            src={item.frontmatter.featuredImage}
            alt={item.frontmatter.title}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <CoverFallback
            seed={item.url}
            label={TYPE_LABEL[item.type]}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        <span className="absolute left-5 top-5 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-indigo-300 backdrop-blur">
          {TYPE_LABEL[item.type]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-serif text-2xl leading-tight text-white transition-colors group-hover:text-indigo-300">
          {item.frontmatter.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm text-slate-400">
          {item.frontmatter.description}
        </p>
        <div className="mt-5 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} />
            {new Date(item.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <span className="text-slate-600">·</span>
          <span>{item.readingTime} min read</span>
        </div>
      </div>
    </Link>
  );
}
