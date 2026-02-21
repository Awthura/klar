import PCAMathPhase from "@/components/pca/MathPhase";
import PCAVisualPhase from "@/components/pca/VisualPhase";
import PCACodePhase from "@/components/pca/CodePhase";

export const metadata = {
  title: "Principal Component Analysis — KLAR",
};

export default function PCAPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Principal Component Analysis</h1>
        <p className="text-muted text-lg">
          Reduce dimensionality by projecting data onto the directions of maximum variance.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Dimensionality Reduction
          </span>
        </div>
      </div>

      <PCAMathPhase />
      <PCAVisualPhase />
      <PCACodePhase />
    </div>
  );
}
