import { Moon } from "lucide-react";

const PALETTES = [
  { from: "from-indigo-500/40", to: "to-purple-700/30", icon: "text-indigo-200" },
  { from: "from-amber-400/30", to: "to-rose-700/30", icon: "text-amber-200" },
  { from: "from-emerald-400/30", to: "to-sky-700/30", icon: "text-emerald-200" },
  { from: "from-sky-400/30", to: "to-indigo-700/30", icon: "text-sky-200" },
  { from: "from-fuchsia-400/30", to: "to-indigo-700/30", icon: "text-fuchsia-200" },
];

function hashSeed(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) >>> 0;
  }
  return h;
}

interface CoverFallbackProps {
  seed: string;
  label?: string;
  className?: string;
}

export function CoverFallback({ seed, label, className }: CoverFallbackProps) {
  const palette = PALETTES[hashSeed(seed) % PALETTES.length];
  return (
    <div
      className={`relative flex h-full w-full items-center justify-center bg-gradient-to-br ${palette.from} ${palette.to} ${className ?? ""}`}
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.3), transparent 50%)",
        }}
      />
      <div className="relative flex flex-col items-center gap-3 text-center">
        <Moon
          className={`h-10 w-10 ${palette.icon} drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]`}
        />
        {label && (
          <span className="max-w-[80%] text-[10px] font-black uppercase tracking-[0.2em] text-white/70">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
