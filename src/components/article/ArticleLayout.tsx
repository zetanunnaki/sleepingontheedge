import Image from "next/image";
import Link from "next/link";
import { Calendar, ArrowLeft } from "lucide-react";
import type { ContentItem } from "@/lib/content";

interface ArticleLayoutProps {
  item: ContentItem;
  children: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  eyebrow?: string;
}

export function ArticleLayout({
  item,
  children,
  backHref = "/",
  backLabel = "Home",
  eyebrow,
}: ArticleLayoutProps) {
  const { frontmatter } = item;
  const date = new Date(frontmatter.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href={backHref}
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> {backLabel}
      </Link>

      <header className="mt-8">
        {eyebrow && (
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
            {eyebrow}
          </span>
        )}
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-6xl">
          {frontmatter.title}
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-400">
          {frontmatter.description}
        </p>
        <div className="mt-6 flex items-center gap-5 text-xs uppercase tracking-[0.15em] text-slate-500">
          {frontmatter.author && <span>By {frontmatter.author}</span>}
          <span className="flex items-center gap-1.5">
            <Calendar size={12} /> {date}
          </span>
        </div>
      </header>

      {frontmatter.featuredImage && (
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[28px] border border-white/10 bg-slate-900">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.title}
            fill
            sizes="(min-width: 1024px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-invert prose-lg mt-12 max-w-none
          prose-headings:font-serif prose-headings:font-normal prose-headings:text-white
          prose-h2:mt-14 prose-h2:text-4xl
          prose-h3:text-2xl
          prose-p:text-slate-300 prose-p:leading-relaxed
          prose-strong:text-white
          prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300 hover:prose-a:underline
          prose-li:text-slate-300
          prose-code:text-amber-300 prose-code:before:content-none prose-code:after:content-none"
      >
        {children}
      </div>
    </article>
  );
}
