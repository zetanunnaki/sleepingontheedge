"use client";

import { useMemo, useState } from "react";
import { Moon, Sun, ArrowRight } from "lucide-react";

type Mode = "wakeAt" | "sleepNow";

const CYCLE_MINUTES = 90;
const FALL_ASLEEP_MINUTES = 14;
const CYCLES_TO_SHOW = [6, 5, 4, 3];

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

function addMinutes(d: Date, mins: number) {
  return new Date(d.getTime() + mins * 60_000);
}

function parseTime(value: string) {
  const [h, m] = value.split(":").map(Number);
  const d = new Date();
  d.setHours(h, m, 0, 0);
  return d;
}

export function SleepCycleCalculator() {
  const [mode, setMode] = useState<Mode>("wakeAt");
  const [wakeAt, setWakeAt] = useState("07:00");

  const results = useMemo(() => {
    const base = mode === "wakeAt" ? parseTime(wakeAt) : new Date();
    return CYCLES_TO_SHOW.map((cycles) => {
      const totalMinutes = cycles * CYCLE_MINUTES;
      const time =
        mode === "wakeAt"
          ? addMinutes(base, -(totalMinutes + FALL_ASLEEP_MINUTES))
          : addMinutes(base, FALL_ASLEEP_MINUTES + totalMinutes);
      return {
        cycles,
        hours: (totalMinutes / 60).toFixed(1),
        time: formatTime(time),
      };
    });
  }, [mode, wakeAt]);

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10">
      {/* Mode toggle */}
      <div className="flex w-full overflow-hidden rounded-full border border-white/10 bg-white/5 p-1 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setMode("wakeAt")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 transition-all ${
            mode === "wakeAt"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Sun size={14} /> I want to wake up at…
        </button>
        <button
          type="button"
          onClick={() => setMode("sleepNow")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 transition-all ${
            mode === "sleepNow"
              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
              : "text-slate-400 hover:text-white"
          }`}
        >
          <Moon size={14} /> If I sleep now…
        </button>
      </div>

      {/* Input */}
      {mode === "wakeAt" ? (
        <div className="mt-8 flex flex-col items-center gap-3">
          <label
            htmlFor="wake-time"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400"
          >
            Target Wake Time
          </label>
          <input
            id="wake-time"
            type="time"
            value={wakeAt}
            onChange={(e) => setWakeAt(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-center font-serif text-4xl text-white outline-none focus:border-indigo-500/50"
          />
        </div>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
            Right now
          </p>
          <p className="mt-2 font-serif text-4xl text-white">
            {formatTime(new Date())}
          </p>
        </div>
      )}

      {/* Results */}
      <div className="mt-10">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          {mode === "wakeAt"
            ? "Go to bed at one of these times"
            : "Wake up at one of these times"}
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {results.map((r, i) => (
            <div
              key={r.cycles}
              className={`flex items-center justify-between rounded-2xl border p-5 transition-all ${
                i === 0
                  ? "border-indigo-500/40 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <div>
                <div className="font-serif text-3xl text-white">{r.time}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {r.cycles} cycles · {r.hours}h sleep
                </div>
              </div>
              {i === 0 && (
                <span className="rounded-full bg-indigo-600 px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] text-white">
                  Recommended
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <p className="mt-8 flex items-start gap-2 text-xs text-slate-500">
        <ArrowRight size={12} className="mt-0.5 shrink-0 text-indigo-400" />
        Calculated as 90-minute sleep cycles plus a 14-minute average time to
        fall asleep. Waking at the end of a cycle (rather than the middle) is
        why you sometimes feel worse after a longer nap.
      </p>
    </div>
  );
}
