import MergeSortMathPhase from "@/components/merge-sort/MathPhase";
import MergeSortVisualPhase from "@/components/merge-sort/VisualPhase";
import MergeSortCodePhase from "@/components/merge-sort/CodePhase";

export const metadata = {
  title: "Merge Sort — KLAR",
};

export default function MergeSortPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Merge Sort</h1>
        <p className="text-muted text-lg">
          Divide-and-conquer sorting that recursively splits and merges sorted
          subarrays.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(n log n)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Sorting
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Divide & Conquer
          </span>
        </div>
      </div>

      <MergeSortMathPhase />
      <MergeSortVisualPhase />
      <MergeSortCodePhase />
    </div>
  );
}
