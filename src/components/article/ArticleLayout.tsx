import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { ContentItem } from "@/lib/content";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { TableOfContents } from "./TableOfContents";

import { TagChips } from "./TagChips";
import { CoverFallback } from "./CoverFallback";
import { ReadingProgress } from "./ReadingProgress";
import { ShareButtons } from "./ShareButtons";
import { ScrollToTop } from "./ScrollToTop";
import { getAuthor } from "@/lib/authors";

interface ArticleLayoutProps {
  item: ContentItem;
  children: React.ReactNode;
  crumbs: Crumb[];
  eyebrow?: string;
}

export function ArticleLayout({
  item,
  children,
  crumbs,
  eyebrow,
}: ArticleLayoutProps) {
  const { frontmatter } = item;
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const updated = frontmatter.updated
    ? new Date(frontmatter.updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;
  const author = frontmatter.author ? getAuthor(frontmatter.author) : null;

  return (
    <article className="relative z-10 mx-auto max-w-3xl px-5 py-10 sm:px-6 md:py-24">
      <ReadingProgress />
      <Breadcrumbs items={crumbs} />

      <header className="animate-fade-up mt-6 sm:mt-8">
        <div className="flex flex-wrap items-center gap-3">
          {eyebrow && (
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
              {eyebrow}
            </span>
          )}
          {updated && (
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-emerald-300">
              Recently updated
            </span>
          )}
        </div>
        <h1 className="mt-4 font-serif text-[2rem] leading-[1.05] text-white sm:text-5xl md:text-6xl">
          {frontmatter.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-400 sm:mt-6 sm:text-lg">
          {frontmatter.description}
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.15em] text-slate-500 sm:mt-6 sm:gap-x-5 sm:text-xs">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="transition-colors hover:text-white"
            >
              By {author.name}
            </Link>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {updated ? `Updated ${updated}` : date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {item.readingTime} min read
          </span>
        </div>
        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <div className="mt-5 sm:mt-6">
            <TagChips tags={frontmatter.tags} size="sm" showIcon />
          </div>
        )}
      </header>

      <div className="animate-fade-up delay-100 relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-[24px] border border-white/10 bg-slate-900 shadow-2xl shadow-indigo-950/30 sm:mt-10 sm:rounded-[28px]">
        {frontmatter.featuredImage ? (
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
          />
        ) : (
          <CoverFallback seed={item.url} label={eyebrow ?? "SleepingOnTheEdge"} />
        )}
      </div>

      <TableOfContents items={item.toc} />

      <div
        className="animate-fade-up delay-150 prose prose-invert prose-base mt-10 max-w-none sm:prose-lg sm:mt-12
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-12 prose-h2:text-3xl prose-h2:scroll-mt-24 sm:prose-h2:mt-14 sm:prose-h2:text-4xl
          prose-h3:text-xl prose-h3:scroll-mt-24 sm:prose-h3:text-2xl
          prose-p:text-slate-300 prose-p:leading-[1.75]
          prose-strong:text-white prose-strong:font-semibold
          prose-a:text-indigo-400 prose-a:no-underline prose-a:font-medium hover:prose-a:text-indigo-300 hover:prose-a:underline
          prose-li:text-slate-300 prose-li:leading-[1.75]
          prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:px-6 prose-blockquote:py-3 prose-blockquote:not-italic
          prose-code:text-amber-300 prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-2xl prose-img:border prose-img:border-white/10"
      >
        {children}
      </div>

      <ShareButtons title={frontmatter.title} url={item.url} />


      <ScrollToTop />
    </article>
  );
}
