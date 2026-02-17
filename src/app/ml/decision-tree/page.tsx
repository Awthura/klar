import DecisionTreeMathPhase from "@/components/decision-tree/MathPhase";
import DecisionTreeVisualPhase from "@/components/decision-tree/VisualPhase";
import DecisionTreeCodePhase from "@/components/decision-tree/CodePhase";

export const metadata = {
  title: "Decision Tree — KLAR",
};

export default function DecisionTreePage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Decision Tree</h1>
        <p className="text-muted text-lg">
          Recursively split feature space using information gain to build interpretable classifiers.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Classification
          </span>
        </div>
      </div>

      <DecisionTreeMathPhase />
      <DecisionTreeVisualPhase />
      <DecisionTreeCodePhase />
    </div>
  );
}
