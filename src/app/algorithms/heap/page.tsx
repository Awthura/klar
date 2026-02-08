import HeapMathPhase from "@/components/heap/MathPhase";
import HeapVisualPhase from "@/components/heap/VisualPhase";
import HeapCodePhase from "@/components/heap/CodePhase";

export const metadata = {
  title: "Heap & Priority Queue — KLAR",
};

export default function HeapPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Heap &amp; Priority Queue</h1>
        <p className="text-muted text-lg">
          A complete binary tree satisfying the heap property, enabling
          efficient min/max extraction.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(log n)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Data Structures
          </span>
        </div>
      </div>

      <HeapMathPhase />
      <HeapVisualPhase />
      <HeapCodePhase />
    </div>
  );
}
