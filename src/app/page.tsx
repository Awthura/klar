import Link from "next/link";
import { subjects } from "@/lib/subjects";

const phaseInfo = [
  {
    phase: 1,
    title: "The Mathematics",
    description: "Formal definitions, recurrence relations, and complexity analysis",
    color: "text-phase1",
    border: "border-phase1",
  },
  {
    phase: 2,
    title: "See It Work",
    description: "Interactive visualizations with step-by-step animations",
    color: "text-phase2",
    border: "border-phase2",
  },
  {
    phase: 3,
    title: "The Code",
    description: "Math-to-code bridge with side-by-side mapping",
    color: "text-phase3",
    border: "border-phase3",
  },
];

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-16">
      <div className="mb-16">
        <h1 className="text-5xl font-bold tracking-tight mb-2">
          <span className="text-accent">KLAR</span>
        </h1>
        <p className="text-lg text-muted font-medium mb-4">
          Knowledge Lab for Algorithms &amp; Reasoning
        </p>
        <p className="text-xl text-muted max-w-2xl">
          An open-source platform for learning AI, CS, and ML through formal
          mathematics, interactive visualizations, and code bridges.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
          Three-Phase Learning
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {phaseInfo.map((p) => (
            <div
              key={p.phase}
              className={`rounded-xl border-l-4 ${p.border} border border-card-border bg-card-bg p-5`}
            >
              <span className={`text-xs font-bold uppercase tracking-widest ${p.color}`}>
                Phase {p.phase}
              </span>
              <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
              <p className="text-sm text-muted mt-2">{p.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-muted mb-6">
          Subjects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={subject.basePath}
              className="group rounded-xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/5"
            >
              <h3 className="text-xl font-semibold group-hover:text-accent transition-colors">
                {subject.name}
              </h3>
              <p className="text-sm text-muted mt-2">{subject.description}</p>
              <span className="inline-block mt-4 text-xs font-medium text-accent">
                {subject.topics.length} topics &rarr;
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
