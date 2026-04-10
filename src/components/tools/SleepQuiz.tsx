"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Check } from "lucide-react";

type QuestionId =
  | "primaryProblem"
  | "phoneInBedroom"
  | "morningGrogginess"
  | "thermalIssue";

interface Choice {
  value: string;
  label: string;
}

interface Question {
  id: QuestionId;
  prompt: string;
  choices: Choice[];
}

const QUESTIONS: Question[] = [
  {
    id: "primaryProblem",
    prompt: "What's bothering you most right now?",
    choices: [
      { value: "fall_asleep", label: "Falling asleep takes forever" },
      { value: "stay_asleep", label: "I wake up at 3 AM and can't get back" },
      { value: "groggy", label: "I feel groggy no matter how long I sleep" },
      { value: "schedule", label: "My schedule is just out of whack" },
    ],
  },
  {
    id: "phoneInBedroom",
    prompt: "Do you keep your phone on the nightstand?",
    choices: [
      { value: "yes", label: "Yes — and I scroll before bed" },
      { value: "sometimes", label: "Sometimes" },
      { value: "no", label: "No — it's already in another room" },
    ],
  },
  {
    id: "morningGrogginess",
    prompt: "How easy is your morning wake-up?",
    choices: [
      { value: "hard", label: "Very hard — I hit snooze 4 times" },
      { value: "medium", label: "Manageable, with effort" },
      { value: "easy", label: "Pretty smooth" },
    ],
  },
  {
    id: "thermalIssue",
    prompt: "Do you ever wake up too hot or too cold?",
    choices: [
      { value: "hot", label: "Yes, usually too hot" },
      { value: "cold", label: "Yes, usually too cold" },
      { value: "no", label: "No, temperature isn't an issue" },
    ],
  },
];

interface Recommendation {
  title: string;
  body: string;
  href: string;
  ctaLabel: string;
}

function getRecommendations(answers: Partial<Record<QuestionId, string>>): Recommendation[] {
  const recs: Recommendation[] = [];

  if (answers.primaryProblem === "fall_asleep") {
    recs.push({
      title: "Start with light hygiene",
      body: "Hard-to-fall-asleep is most often a circadian alignment problem. Bright light in the morning and dim light in the evening will move the needle faster than any supplement.",
      href: "/guides/how-to-fix-sleep-schedule",
      ctaLabel: "Read the protocol",
    });
  }
  if (answers.primaryProblem === "stay_asleep") {
    recs.push({
      title: "Identify your 3 AM trigger",
      body: "Middle-of-the-night wake-ups have a small set of common causes — and most of them are addressable.",
      href: "/guides/why-you-wake-up-at-3-am",
      ctaLabel: "Read the guide",
    });
  }
  if (answers.primaryProblem === "groggy") {
    recs.push({
      title: "Wake up at the right cycle moment",
      body: "Grogginess often comes from waking mid-deep-sleep. The sleep cycle calculator helps you time bedtime so your alarm fires at a cycle boundary.",
      href: "/tools/sleep-cycle-calculator",
      ctaLabel: "Open the calculator",
    });
  }
  if (answers.primaryProblem === "schedule") {
    recs.push({
      title: "Reset your schedule in a week",
      body: "A consistent wake time plus morning light is the highest-leverage circadian reset most people can do.",
      href: "/guides/how-to-fix-sleep-schedule",
      ctaLabel: "Start the protocol",
    });
  }

  if (answers.phoneInBedroom === "yes") {
    recs.push({
      title: "Get your phone out of the bedroom",
      body: "If you can only do one behavioral change, this is it. A dedicated bedside clock removes the temptation entirely.",
      href: "/best/best-smart-alarm-clocks",
      ctaLabel: "See alarm clock picks",
    });
  }

  if (answers.morningGrogginess === "hard") {
    recs.push({
      title: "Try a sunrise alarm",
      body: "Gradual light wake-ups consistently outperform buzzer alarms in aggregated reviews — especially in winter or for heavy sleepers.",
      href: "/reviews/hatch-restore-2-review",
      ctaLabel: "Read the Hatch review",
    });
  }

  if (answers.thermalIssue === "hot") {
    recs.push({
      title: "Cool the surface, not just the room",
      body: "Hot sleepers respond more to cooling the mattress surface than to lowering room air temperature.",
      href: "/guides/optimal-bedroom-temperature",
      ctaLabel: "Read the temperature guide",
    });
  }
  if (answers.thermalIssue === "cold") {
    recs.push({
      title: "Optimize layering",
      body: "Cold sleepers often over-layer with heavy duvets that trap moisture. Breathable warmth beats raw insulation.",
      href: "/guides/optimal-bedroom-temperature",
      ctaLabel: "Read the temperature guide",
    });
  }

  return recs.slice(0, 4);
}

export function SleepQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<Record<QuestionId, string>>>({});

  const isDone = step >= QUESTIONS.length;

  function answer(value: string) {
    const q = QUESTIONS[step];
    setAnswers({ ...answers, [q.id]: value });
    setStep(step + 1);
  }

  function reset() {
    setStep(0);
    setAnswers({});
  }

  if (isDone) {
    const recs = getRecommendations(answers);
    return (
      <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-amber-400">
          <Check size={14} /> Your Stack
        </div>
        <h2 className="mt-3 font-serif text-3xl text-white sm:text-4xl">
          Based on your answers,{" "}
          <span className="italic text-indigo-300">start here.</span>
        </h2>
        <div className="mt-8 space-y-4">
          {recs.map((rec) => (
            <div
              key={rec.href}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6"
            >
              <h3 className="font-serif text-2xl text-white">{rec.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {rec.body}
              </p>
              <Link
                href={rec.href}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-indigo-400 hover:text-white"
              >
                {rec.ctaLabel} <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-bold uppercase tracking-[0.15em] text-slate-300 transition-colors hover:border-indigo-500/40 hover:text-white"
        >
          <RotateCcw size={12} /> Start over
        </button>
      </div>
    );
  }

  const question = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 to-slate-950 p-8 md:p-10">
      {/* Progress */}
      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
        <span>
          Question {step + 1} of {QUESTIONS.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <h2 className="mt-8 font-serif text-3xl text-white sm:text-4xl">
        {question.prompt}
      </h2>

      <div className="mt-8 grid gap-3">
        {question.choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => answer(choice.value)}
            className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left text-sm text-slate-300 transition-all hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white"
          >
            <span>{choice.label}</span>
            <ArrowRight
              size={16}
              className="text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-indigo-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
