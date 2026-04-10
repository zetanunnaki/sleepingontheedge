import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Author } from "@/lib/authors";

interface AuthorBioProps {
  author: Author;
}

export function AuthorBio({ author }: AuthorBioProps) {
  return (
    <aside
      aria-labelledby="author-bio-name"
      className="not-prose mt-16 overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-6 sm:p-8"
    >
      <div className="flex items-start gap-5">
        <div
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-xl font-serif font-bold text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.3)]"
        >
          {author.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="flex-1">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
            {author.role}
          </p>
          <h3 id="author-bio-name" className="mt-1 font-serif text-2xl text-white">{author.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            {author.bio}
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-1">
            {author.credentials.map((c) => (
              <li
                key={c}
                className="flex items-start gap-2 text-xs text-slate-300"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span>{c}</span>
              </li>
            ))}
          </ul>
          <Link
            href={`/authors/${author.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400 transition-colors hover:text-white"
          >
            More from {author.name.split(" ")[0]}{" "}
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </aside>
  );
}
