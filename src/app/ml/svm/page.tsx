import SVMMathPhase from "@/components/svm/MathPhase";
import SVMVisualPhase from "@/components/svm/VisualPhase";
import SVMCodePhase from "@/components/svm/CodePhase";

export const metadata = {
  title: "Support Vector Machine — KLAR",
};

export default function SVMPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Support Vector Machine</h1>
        <p className="text-muted text-lg">
          Find the maximum-margin hyperplane that separates two classes, with
          support vectors defining the boundary.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Classification
          </span>
        </div>
      </div>

      <SVMMathPhase />
      <SVMVisualPhase />
      <SVMCodePhase />
    </div>
  );
}
