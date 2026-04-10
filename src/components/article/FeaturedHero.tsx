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
      className="group grid overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 transition-all hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-500/10 lg:grid-cols-[1.2fr_1fr]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 lg:aspect-auto">
        {item.frontmatter.featuredImage ? (
          <Image
            src={item.frontmatter.featuredImage}
            alt={item.frontmatter.title}
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
            priority
          />
        ) : (
          <CoverFallback seed={item.url} label={eyebrow} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
      </div>
      <div className="flex flex-col justify-center p-8 md:p-12">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          Featured · {eyebrow}
        </span>
        <h2 className="mt-4 font-serif text-3xl leading-tight text-white sm:text-4xl group-hover:text-indigo-300">
          {item.frontmatter.title}
        </h2>
        <p className="mt-4 text-base text-slate-400">
          {item.frontmatter.description}
        </p>
        <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-[0.15em] text-slate-500">
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {item.readingTime} min read
          </span>
        </div>
        <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400">
          Read the full piece <ArrowRight size={12} />
        </span>
      </div>
    </Link>
  );
}
