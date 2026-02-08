import DpMathPhase from "@/components/dynamic-programming/MathPhase";
import DpVisualPhase from "@/components/dynamic-programming/VisualPhase";
import DpCodePhase from "@/components/dynamic-programming/CodePhase";

export const metadata = {
  title: "Dynamic Programming — KLAR",
};

export default function DynamicProgrammingPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Dynamic Programming</h1>
        <p className="text-muted text-lg">
          Solve complex problems by breaking them into overlapping subproblems
          and caching results.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            Varies
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Optimization
          </span>
        </div>
      </div>

      <DpMathPhase />
      <DpVisualPhase />
      <DpCodePhase />
    </div>
  );
}
