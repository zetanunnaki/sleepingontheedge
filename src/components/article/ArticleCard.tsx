import Link from "next/link";
import Image from "next/image";
import { Calendar, ArrowUpRight } from "lucide-react";
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
      className="group relative flex flex-col overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[28px]"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
        {item.frontmatter.featuredImage ? (
          <Image
            src={item.frontmatter.featuredImage}
            alt={item.frontmatter.title}
            fill
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-85 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
        ) : (
          <CoverFallback
            seed={item.url}
            label={TYPE_LABEL[item.type]}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-indigo-400/30 bg-indigo-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-indigo-200 backdrop-blur-sm sm:left-5 sm:top-5">
          {TYPE_LABEL[item.type]}
        </span>
        <span className="absolute right-4 top-4 flex h-9 w-9 translate-x-1 items-center justify-center rounded-full border border-white/20 bg-slate-950/70 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:right-5 sm:top-5">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-serif text-xl leading-tight text-white transition-colors group-hover:text-indigo-300 sm:text-2xl">
          {item.frontmatter.title}
        </h3>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-400">
          {item.frontmatter.description}
        </p>
        <div className="mt-4 flex items-center gap-3 text-[10px] uppercase tracking-[0.1em] text-slate-500 sm:mt-5 sm:text-xs">
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
