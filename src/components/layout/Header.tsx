import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { SearchDialog } from "@/components/search/SearchDialog";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 md:px-10 md:py-5"
      >
        <Link
          href="/"
          aria-label="SleepingOnTheEdge home"
          className="group flex items-center gap-2 font-serif text-lg font-bold tracking-tighter text-white transition-opacity hover:opacity-90 sm:text-xl md:text-2xl"
        >
          <Image
            src="/brand/logo-icon.png"
            alt=""
            aria-hidden
            width={32}
            height={32}
            className="h-8 w-8 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)] transition-all group-hover:shadow-[0_0_25px_rgba(79,70,229,0.7)]"
            priority
          />
          <span>
            Sleeping<span className="text-indigo-400">OnThe</span>Edge
          </span>
        </Link>
        <ul className="hidden gap-8 text-xs font-medium uppercase tracking-[0.18em] text-slate-400 lg:flex xl:gap-10">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="relative py-2 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchDialog />
          <Link
            href="/tools/sleep-edge-quiz"
            className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-slate-950 transition-all hover:bg-indigo-400 hover:text-white lg:inline-block"
          >
            Take the Quiz
          </Link>
          <MobileMenu />
        </div>
      </nav>
    </div>
  );
}
