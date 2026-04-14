"use client";

import { Link2, Check } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl =
    typeof window !== "undefined" ? window.location.href : url;

  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedTitle = encodeURIComponent(title);

  function copyLink() {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="not-prose mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        Share
      </span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Share on X (Twitter)"
      >
        𝕏 Post
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Share on Reddit"
      >
        Reddit
      </a>
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Share on Pinterest"
      >
        Pinterest
      </a>
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Share on LinkedIn"
      >
        LinkedIn
      </a>
      <button
        type="button"
        onClick={copyLink}
        className="flex h-9 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 text-xs font-bold text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
        aria-label="Copy link to clipboard"
      >
        {copied ? (
          <>
            <Check size={12} className="text-emerald-400" /> Copied
          </>
        ) : (
          <>
            <Link2 size={12} /> Copy link
          </>
        )}
      </button>
    </div>
  );
}
