import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FlaskConical, Moon, Activity, Repeat, ShieldOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How SleepStackHQ tests sleep products and writes science-backed protocols. Our criteria, our gear, our biases.",
};

const PILLARS = [
  {
    icon: FlaskConical,
    title: "Real testing, real beds",
    body: "Every product is tested on a real human in a real bedroom — not in a hotel, not in a showroom. Minimum 30 nights for reviews, 60 for top picks.",
  },
  {
    icon: Activity,
    title: "Wearable-validated",
    body: "We log every test night with at least one validated wearable (Oura, Whoop, or Apple Watch). Subjective verdicts get cross-checked against objective sleep architecture data.",
  },
  {
    icon: Moon,
    title: "Controlled variables",
    body: "When testing a single product we hold the rest of the stack constant — same bedtime window, same room temp, same wind-down routine. One change per night.",
  },
  {
    icon: Repeat,
    title: "Living updates",
    body: "Products change. Firmware ships. Formulas reformulate. We re-test annually and timestamp every update at the bottom of the article.",
  },
  {
    icon: ShieldOff,
    title: "No PR loans",
    body: "We buy our own gear at retail prices. We don't accept free samples for review consideration. We do disclose when a brand has previously sent us PR for an unrelated product.",
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
          How we <span className="italic text-indigo-300">test.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-slate-400">
          SleepStackHQ exists because most sleep advice on the internet is
          written by people who have never tested what they recommend. We do
          the work so you don&apos;t have to. Here&apos;s exactly how.
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
          Our <span className="italic text-indigo-300">biases.</span>
        </h2>
        <div className="prose prose-invert prose-lg mt-4 max-w-none prose-headings:font-serif prose-p:text-slate-300">
          <p>
            Every reviewer has biases. Pretending otherwise is the bias. Here
            are ours, in plain English:
          </p>
          <ul>
            <li>
              <strong>We weight deep sleep heavily.</strong> If a product
              boosts time-in-bed but tanks slow-wave sleep, we don&apos;t
              recommend it.
            </li>
            <li>
              <strong>We favor durable hardware over subscriptions.</strong>{" "}
              If a device only works when you&apos;re paying $10/mo, we say so
              loudly.
            </li>
            <li>
              <strong>We&apos;re skeptical of supplements.</strong> The
              evidence bar for ingestibles is higher than for hardware.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
