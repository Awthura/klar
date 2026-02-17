import LinearRegressionMathPhase from "@/components/linear-regression/MathPhase";
import LinearRegressionVisualPhase from "@/components/linear-regression/VisualPhase";
import LinearRegressionCodePhase from "@/components/linear-regression/CodePhase";

export const metadata = {
  title: "Linear Regression — KLAR",
};

export default function LinearRegressionPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Linear Regression</h1>
        <p className="text-muted text-lg">
          Fit a line to data by minimizing mean squared error using gradient descent.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Regression
          </span>
        </div>
      </div>

      <LinearRegressionMathPhase />
      <LinearRegressionVisualPhase />
      <LinearRegressionCodePhase />
    </div>
  );
}
