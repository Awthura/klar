import InsertionSortMathPhase from "@/components/insertion-sort/MathPhase";
import InsertionSortVisualPhase from "@/components/insertion-sort/VisualPhase";
import InsertionSortCodePhase from "@/components/insertion-sort/CodePhase";

export const metadata = {
  title: "Insertion Sort — KLAR",
};

export default function InsertionSortPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Insertion Sort</h1>
        <p className="text-muted text-lg">
          Build a sorted array one element at a time by inserting each into its
          correct position.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(n²)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Sorting
          </span>
        </div>
      </div>

      <InsertionSortMathPhase />
      <InsertionSortVisualPhase />
      <InsertionSortCodePhase />
    </div>
  );
}
