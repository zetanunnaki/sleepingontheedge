"use client";

import { useMemo, useState } from "react";
import { Coffee, AlertTriangle, ShieldCheck } from "lucide-react";

const CAFFEINE_HALF_LIFE_HOURS = 5;
const SLEEP_THRESHOLD_MG = 50;

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function formatTime(d: Date) {
  let h = d.getHours();
  const m = d.getMinutes();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${pad(m)} ${ampm}`;
}

function parseTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

function addHours(d: Date, hours: number) {
  return new Date(d.getTime() + hours * 60 * 60_000);
}

export function CaffeineCalculator() {
  const [doseMg, setDoseMg] = useState(95);
  const [bedtime, setBedtime] = useState("23:00");

  const result = useMemo(() => {
    // Time until dose decays to SLEEP_THRESHOLD_MG via exponential decay.
    const ratio = doseMg / SLEEP_THRESHOLD_MG;
    if (ratio <= 1) {
      return {
        hoursToSafe: 0,
        latestSafe: null,
        verdict: "Already below the sleep-disruption threshold.",
        ok: true,
      };
    }
    const hoursToSafe = Math.log2(ratio) * CAFFEINE_HALF_LIFE_HOURS;
    const bed = parseTime(bedtime);
    const latestSafe = addHours(bed, -hoursToSafe);
    return {
      hoursToSafe,
      latestSafe,
      verdict: `Cut off caffeine ${hoursToSafe.toFixed(1)} hours before bed`,
      ok: false,
    };
  }, [doseMg, bedtime]);

  const examples = [
    { name: "Espresso (1 shot)", mg: 64 },
    { name: "Drip coffee (8 oz)", mg: 95 },
    { name: "Cold brew (12 oz)", mg: 200 },
    { name: "Energy drink (16 oz)", mg: 160 },
    { name: "Green tea (8 oz)", mg: 28 },
    { name: "Black tea (8 oz)", mg: 47 },
  ];

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10">
      {/* Inputs */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="dose"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400"
          >
            Caffeine Dose (mg)
          </label>
          <input
            id="dose"
            type="number"
            min={0}
            max={1000}
            step={5}
            value={doseMg}
            onChange={(e) => setDoseMg(Number(e.target.value) || 0)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-serif text-3xl text-white outline-none focus:border-indigo-500/50"
          />
        </div>
        <div>
          <label
            htmlFor="bedtime"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400"
          >
            Target Bedtime
          </label>
          <input
            id="bedtime"
            type="time"
            value={bedtime}
            onChange={(e) => setBedtime(e.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 font-serif text-3xl text-white outline-none focus:border-indigo-500/50"
          />
        </div>
      </div>

      {/* Quick presets */}
      <div className="mt-6">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
          Quick fill
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((ex) => (
            <button
              key={ex.name}
              type="button"
              onClick={() => setDoseMg(ex.mg)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 transition-colors hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
            >
              {ex.name} <span className="text-slate-500">· {ex.mg}mg</span>
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      <div
        className={`mt-10 rounded-2xl border p-6 ${
          result.ok
            ? "border-emerald-500/30 bg-emerald-500/5"
            : "border-amber-500/30 bg-amber-500/5"
        }`}
      >
        <div className="flex items-start gap-4">
          {result.ok ? (
            <ShieldCheck className="mt-0.5 h-6 w-6 shrink-0 text-emerald-400" />
          ) : (
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-amber-400" />
          )}
          <div className="flex-1">
            <p
              className={`text-[10px] font-black uppercase tracking-[0.2em] ${
                result.ok ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {result.ok ? "You're clear" : "Cutoff time"}
            </p>
            {result.latestSafe && (
              <p className="mt-2 font-serif text-4xl text-white">
                No caffeine after {formatTime(result.latestSafe)}
              </p>
            )}
            <p className="mt-2 text-sm text-slate-400">{result.verdict}</p>
          </div>
        </div>
      </div>

      <p className="mt-8 flex items-start gap-2 text-xs text-slate-500">
        <Coffee size={12} className="mt-0.5 shrink-0 text-indigo-400" />
        Calculated using a 5-hour caffeine half-life and a 50mg sleep-disruption
        threshold. Half-life varies by genetics — slow CYP1A2 metabolizers
        should add 1–3 hours to the cutoff.
      </p>
    </div>
  );
}
