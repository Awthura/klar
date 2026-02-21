import NaiveBayesMathPhase from "@/components/naive-bayes/MathPhase";
import NaiveBayesVisualPhase from "@/components/naive-bayes/VisualPhase";
import NaiveBayesCodePhase from "@/components/naive-bayes/CodePhase";

export const metadata = {
  title: "Naive Bayes — KLAR",
};

export default function NaiveBayesPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Naive Bayes</h1>
        <p className="text-muted text-lg">
          Probabilistic classifier using Bayes&apos; theorem with the conditional
          independence assumption.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Classification
          </span>
        </div>
      </div>

      <NaiveBayesMathPhase />
      <NaiveBayesVisualPhase />
      <NaiveBayesCodePhase />
    </div>
  );
}
