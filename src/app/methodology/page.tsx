import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FlaskConical,
  Library,
  Users,
  Repeat,
  ShieldOff,
  ScrollText,
} from "lucide-react";
import { canonical } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How SleepStackHQ researches sleep products and writes science-informed protocols. Our sources, our process, and what we don't claim.",
  alternates: { canonical: canonical("/methodology") },
};

const PILLARS = [
  {
    icon: Library,
    title: "We aggregate published research",
    body: "Every health-related claim on this site is sourced from peer-reviewed studies, clinical guidelines, or organizations like the National Sleep Foundation and the AASM. Where evidence is mixed, we say so plainly.",
  },
  {
    icon: Users,
    title: "We synthesize verified buyer reviews",
    body: "Our product picks reflect aggregated feedback from thousands of verified buyers across Amazon, Walmart, manufacturer sites, and independent communities — not personal endorsements.",
  },
  {
    icon: ScrollText,
    title: "We separate evidence from opinion",
    body: "When we share an editorial take, we label it. When we cite a study, we link it. You should always be able to tell the difference between what the data says and what we think.",
  },
  {
    icon: Repeat,
    title: "Living updates",
    body: "Sleep science moves. Products change formulas. We revisit our roundups and reviews regularly and timestamp every meaningful update.",
  },
  {
    icon: ShieldOff,
    title: "No paid placement",
    body: "We don't accept payment in exchange for rankings, reviews, or coverage. We do earn affiliate commissions when readers buy through our links — these never influence which products make our shortlists.",
  },
  {
    icon: FlaskConical,
    title: "What we don't claim",
    body: "We are not a clinical lab. We do not perform original research. We do not provide medical advice. For anything affecting a medical condition, talk to a qualified provider.",
  },
];

export default function MethodologyPage() {
  return (
    <div className="container relative z-10 mx-auto max-w-3xl px-6 py-16 md:py-24">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 transition-colors hover:text-white"
      >
        <ArrowLeft size={14} /> Home
      </Link>
      <header className="mt-10">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          Editorial Standards
        </span>
        <h1 className="mt-4 font-serif text-5xl leading-[1.05] text-white sm:text-7xl">
          How we <span className="italic text-indigo-300">research.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-400">
          SleepStackHQ exists to help you make better decisions about your
          sleep. We do that by aggregating peer-reviewed research and
          large-scale buyer feedback into one place — and by being honest
          about what we don&apos;t know.
        </p>
      </header>

      <div className="mt-16 grid gap-5">
        {PILLARS.map((p) => (
          <div
            key={p.title}
            className="flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600/20 text-indigo-300 shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <p.icon size={22} />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-white">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-16 rounded-[28px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8">
        <h2 className="font-serif text-3xl text-white">
          Our research{" "}
          <span className="italic text-indigo-300">stack.</span>
        </h2>
        <div className="prose prose-invert prose-lg mt-4 max-w-none prose-headings:font-serif prose-p:text-slate-300">
          <p>
            For every article, we typically draw from a combination of:
          </p>
          <ul>
            <li>
              <strong>Peer-reviewed sleep research</strong> indexed in PubMed,
              Cochrane, and the Sleep Research Society.
            </li>
            <li>
              <strong>Clinical guidelines</strong> from the American Academy
              of Sleep Medicine, NIH, and equivalent bodies.
            </li>
            <li>
              <strong>Aggregated verified-buyer reviews</strong> from major
              retailers, manufacturer sites, and active sleep-focused
              communities (e.g. r/Biohackers, r/Sleep).
            </li>
            <li>
              <strong>Independent third-party testing reports</strong> for
              product quality and ingredient verification, where available.
            </li>
            <li>
              <strong>Manufacturer documentation</strong> for specs, materials,
              and warranty terms.
            </li>
          </ul>
          <p>
            We do not run our own clinical trials. We are not a substitute for
            a physician. Where research is uncertain or evolving, we say so —
            because the worst kind of sleep advice is the kind that pretends
            to be more certain than it is.
          </p>
        </div>
      </section>
    </div>
  );
}
