import KnnMathPhase from "@/components/knn/MathPhase";
import KnnVisualPhase from "@/components/knn/VisualPhase";
import KnnCodePhase from "@/components/knn/CodePhase";

export const metadata = {
  title: "k-Nearest Neighbors — KLAR",
};

export default function KnnPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">k-Nearest Neighbors</h1>
        <p className="text-muted text-lg">
          Classify a point by majority vote of its k closest neighbors in feature space.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Classification
          </span>
        </div>
      </div>

      <KnnMathPhase />
      <KnnVisualPhase />
      <KnnCodePhase />
    </div>
  );
}
