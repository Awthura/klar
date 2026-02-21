"use client";

const phases = [
  { num: 1, label: "The Mathematics", color: "text-phase1", bg: "hover:bg-phase1/10" },
  { num: 2, label: "See It Work",      color: "text-phase2", bg: "hover:bg-phase2/10" },
  { num: 3, label: "The Code",         color: "text-phase3", bg: "hover:bg-phase3/10" },
] as const;

export default function PhaseNav() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="sticky top-0 z-20 border-b border-sidebar-border bg-sidebar-bg/95 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex gap-0.5 py-1.5">
          {phases.map((p) => (
            <button
              key={p.num}
              onClick={() => scrollTo(`phase-${p.num}`)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${p.color} ${p.bg} cursor-pointer`}
            >
              <span className="opacity-50 font-mono">{p.num}</span>
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
