import DijkstraMathPhase from "@/components/dijkstra/MathPhase";
import DijkstraVisualPhase from "@/components/dijkstra/VisualPhase";
import DijkstraCodePhase from "@/components/dijkstra/CodePhase";

export const metadata = {
  title: "Dijkstra's Algorithm — KLAR",
};

export default function DijkstraPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Dijkstra&apos;s Algorithm</h1>
        <p className="text-muted text-lg">
          Find shortest paths from a source vertex in a weighted graph with
          non-negative edges.
        </p>
        <div className="flex gap-3 mt-4">
          <span className="rounded-full bg-accent-light px-3 py-1 text-xs font-medium text-accent">
            O((V + E) log V)
          </span>
          <span className="rounded-full bg-card-bg border border-card-border px-3 py-1 text-xs font-medium text-muted">
            Graphs
          </span>
        </div>
      </div>

      <DijkstraMathPhase />
      <DijkstraVisualPhase />
      <DijkstraCodePhase />
    </div>
  );
}
