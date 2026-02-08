import GraphDfsMathPhase from "@/components/graph-dfs/MathPhase";
import GraphDfsVisualPhase from "@/components/graph-dfs/VisualPhase";
import GraphDfsCodePhase from "@/components/graph-dfs/CodePhase";

export const metadata = {
  title: "Graph DFS — KLAR",
};

export default function GraphDfsPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Graph DFS</h1>
        <p className="text-muted text-lg">
          Traverse a graph by exploring as deep as possible before backtracking.
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

      <GraphDfsMathPhase />
      <GraphDfsVisualPhase />
      <GraphDfsCodePhase />
    </div>
  );
}
