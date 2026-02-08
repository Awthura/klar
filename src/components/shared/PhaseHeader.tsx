interface PhaseHeaderProps {
  phase: 1 | 2 | 3;
  title: string;
  subtitle: string;
}

const phaseConfig = {
  1: { label: "Phase 1", color: "text-phase1", border: "border-phase1", icon: "f(x)" },
  2: { label: "Phase 2", color: "text-phase2", border: "border-phase2", icon: "\u25B6" },
  3: { label: "Phase 3", color: "text-phase3", border: "border-phase3", icon: "</>" },
};

export default function PhaseHeader({ phase, title, subtitle }: PhaseHeaderProps) {
  const config = phaseConfig[phase];

  return (
    <div className={`border-l-4 ${config.border} pl-4 mb-8`}>
      <div className="flex items-center gap-2 mb-1">
        <span className={`text-xs font-bold uppercase tracking-widest ${config.color}`}>
          {config.label}
        </span>
        <span className={`text-xs ${config.color} opacity-60`}>{config.icon}</span>
      </div>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-muted text-sm mt-1">{subtitle}</p>
    </div>
  );
}
