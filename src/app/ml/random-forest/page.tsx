import RandomForestMathPhase from "@/components/random-forest/MathPhase";
import RandomForestVisualPhase from "@/components/random-forest/VisualPhase";
import RandomForestCodePhase from "@/components/random-forest/CodePhase";

export const metadata = {
  title: "Random Forest — KLAR",
};

export default function RandomForestPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Random Forest</h1>
        <p className="text-muted text-lg">
          Ensemble of decision trees trained on bootstrapped data with feature
          subsampling.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Ensemble
          </span>
        </div>
      </div>

      <RandomForestMathPhase />
      <RandomForestVisualPhase />
      <RandomForestCodePhase />
    </div>
  );
}
