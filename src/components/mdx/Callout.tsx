import { Lightbulb, AlertTriangle, Info, FlaskConical } from "lucide-react";

type CalloutKind = "tip" | "warning" | "info" | "science";

const STYLES: Record<
  CalloutKind,
  { border: string; bg: string; text: string; iconColor: string; Icon: typeof Info; label: string }
> = {
  tip: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/5",
    text: "text-emerald-100",
    iconColor: "text-emerald-400",
    Icon: Lightbulb,
    label: "Tip",
  },
  warning: {
    border: "border-amber-500/30",
    bg: "bg-amber-500/5",
    text: "text-amber-100",
    iconColor: "text-amber-400",
    Icon: AlertTriangle,
    label: "Watch Out",
  },
  info: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-500/5",
    text: "text-indigo-100",
    iconColor: "text-indigo-400",
    Icon: Info,
    label: "Note",
  },
  science: {
    border: "border-sky-500/30",
    bg: "bg-sky-500/5",
    text: "text-sky-100",
    iconColor: "text-sky-400",
    Icon: FlaskConical,
    label: "The Science",
  },
};

interface CalloutProps {
  kind?: CalloutKind;
  title?: string;
  children: React.ReactNode;
}

export function Callout({ kind = "info", title, children }: CalloutProps) {
  const s = STYLES[kind];
  return (
    <aside
      className={`not-prose my-8 rounded-2xl border ${s.border} ${s.bg} p-5`}
    >
      <div className="flex items-start gap-3">
        <s.Icon className={`mt-0.5 h-5 w-5 shrink-0 ${s.iconColor}`} />
        <div className={`flex-1 text-sm leading-relaxed ${s.text}`}>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">
            {title ?? s.label}
          </p>
          <div className="mt-2 space-y-2">{children}</div>
        </div>
      </div>
    </aside>
  );
}
