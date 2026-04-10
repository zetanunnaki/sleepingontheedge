import Link from "next/link";
import { Moon } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { SearchDialog } from "@/components/search/SearchDialog";

export function Header() {
  return (
    <nav className="relative z-50 flex items-center justify-between gap-4 px-6 py-8 md:px-10">
      <Link
        href="/"
        className="flex items-center gap-2 font-serif text-2xl font-bold tracking-tighter text-white"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
          <Moon size={16} fill="white" className="text-white" />
        </span>
        <span>
          SleepStack<span className="text-indigo-400">HQ</span>
        </span>
      </Link>
      <div className="hidden gap-10 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 lg:flex">
        {siteConfig.nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-colors hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <SearchDialog />
        <Link
          href="/best"
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-indigo-400 md:inline-block"
        >
          Get the Stack
        </Link>
      </div>
    </nav>
  );
}
