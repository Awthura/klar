import TopologicalSortMathPhase from "@/components/topological-sort/MathPhase";
import TopologicalSortVisualPhase from "@/components/topological-sort/VisualPhase";
import TopologicalSortCodePhase from "@/components/topological-sort/CodePhase";

export const metadata = {
  title: "Topological Sort — KLAR",
};

export default function TopologicalSortPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Topological Sort</h1>
        <p className="text-muted text-lg">
          Order vertices of a directed acyclic graph so every edge goes from
          earlier to later in the ordering.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(V + E)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Graphs
          </span>
        </div>
      </div>

      <TopologicalSortMathPhase />
      <TopologicalSortVisualPhase />
      <TopologicalSortCodePhase />
    </div>
  );
}
