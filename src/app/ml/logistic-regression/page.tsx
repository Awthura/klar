import LogisticRegressionMathPhase from "@/components/logistic-regression/MathPhase";
import LogisticRegressionVisualPhase from "@/components/logistic-regression/VisualPhase";
import LogisticRegressionCodePhase from "@/components/logistic-regression/CodePhase";

export const metadata = {
  title: "Logistic Regression — KLAR",
};

export default function LogisticRegressionPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Logistic Regression</h1>
        <p className="text-muted text-lg">
          Binary classification using the sigmoid function and cross-entropy loss.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Classification
          </span>
        </div>
      </div>

      <LogisticRegressionMathPhase />
      <LogisticRegressionVisualPhase />
      <LogisticRegressionCodePhase />
    </div>
  );
}
