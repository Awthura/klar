import QuickSortMathPhase from "@/components/quick-sort/MathPhase";
import QuickSortVisualPhase from "@/components/quick-sort/VisualPhase";
import QuickSortCodePhase from "@/components/quick-sort/CodePhase";

export const metadata = {
  title: "Quick Sort — KLAR",
};

export default function QuickSortPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Quick Sort</h1>
        <p className="text-muted text-lg">
          Partition-based sorting that picks a pivot and recursively sorts
          subarrays in-place.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(n log n)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Sorting
          </span>
        </div>
      </div>

      <QuickSortMathPhase />
      <QuickSortVisualPhase />
      <QuickSortCodePhase />
    </div>
  );
}
