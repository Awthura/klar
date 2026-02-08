import GraphBfsMathPhase from "@/components/graph-bfs/MathPhase";
import GraphBfsVisualPhase from "@/components/graph-bfs/VisualPhase";
import GraphBfsCodePhase from "@/components/graph-bfs/CodePhase";

export const metadata = {
  title: "Graph BFS — KLAR",
};

export default function GraphBfsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Graph BFS</h1>
        <p className="text-muted text-lg">
          Breadth-First Search explores a graph layer by layer, finding shortest
          paths in unweighted graphs.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O(V + E)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Graphs
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Shortest Paths
          </span>
        </div>
      </div>

      <GraphBfsMathPhase />
      <GraphBfsVisualPhase />
      <GraphBfsCodePhase />
    </div>
  );
}
