import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site";
import { SearchDialog } from "@/components/search/SearchDialog";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <nav
      aria-label="Primary"
      className="relative z-50 flex items-center justify-between gap-4 px-5 py-6 sm:px-6 md:px-10 md:py-8"
    >
      <Link
        href="/"
        aria-label="SleepingOnTheEdge home"
        className="flex items-center gap-2 font-serif text-xl font-bold tracking-tighter text-white sm:text-2xl"
      >
        <Image
          src="/brand/logo-icon.png"
          alt=""
          aria-hidden
          width={32}
          height={32}
          className="h-8 w-8 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
          priority
        />
        <span>
          Sleeping<span className="text-indigo-400">OnThe</span>Edge
        </span>
      </Link>
      <ul className="hidden gap-10 text-xs font-medium uppercase tracking-[0.2em] text-slate-400 lg:flex">
        {siteConfig.nav.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="transition-colors hover:text-white"
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
          className="hidden rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-all hover:bg-indigo-400 lg:inline-block"
        >
          Take the Quiz
        </Link>
        <MobileMenu />
      </div>
    </nav>
  );
}
