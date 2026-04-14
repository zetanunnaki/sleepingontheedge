import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { CoverFallback } from "./CoverFallback";

interface FeaturedHeroProps {
  item: ContentItem;
  eyebrow: string;
}

export function FeaturedHero({ item, eyebrow }: FeaturedHeroProps) {
  const date = new Date(item.frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={item.url}
      className="group relative grid overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 ring-1 ring-white/5 transition-all hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 sm:rounded-[32px] lg:grid-cols-[1.2fr_1fr]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 lg:aspect-auto">
        {item.frontmatter.featuredImage ? (
          <Image
            src={item.frontmatter.featuredImage}
            alt={item.frontmatter.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover opacity-85 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100"
            priority
          />
        ) : (
          <CoverFallback seed={item.url} label={eyebrow} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/40" />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-amber-300">
          Featured · {eyebrow}
        </span>
        <h2 className="mt-4 font-serif text-2xl leading-tight text-white transition-colors group-hover:text-indigo-300 sm:text-3xl md:text-4xl">
          {item.frontmatter.title}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
          {item.frontmatter.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-4 text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:mt-6 sm:gap-5 sm:text-xs">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {item.readingTime} min read
          </span>
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400 sm:mt-6">
          Read the full piece{" "}
          <ArrowRight
            size={12}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}
