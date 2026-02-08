import BinarySearchMathPhase from "@/components/binary-search/MathPhase";
import BinarySearchVisualPhase from "@/components/binary-search/VisualPhase";
import BinarySearchCodePhase from "@/components/binary-search/CodePhase";

export const metadata = {
  title: "Binary Search — KLAR",
};

export default function BinarySearchPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Binary Search</h1>
        <p className="text-muted text-lg">
          Efficiently find an element in a sorted array by halving the search
          space at each step.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(log n)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Search
          </span>
        </div>
      </div>

      <BinarySearchMathPhase />
      <BinarySearchVisualPhase />
      <BinarySearchCodePhase />
    </div>
  );
}
