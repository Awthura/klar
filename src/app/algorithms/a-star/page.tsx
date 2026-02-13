import AStarMathPhase from "@/components/a-star/MathPhase";
import AStarVisualPhase from "@/components/a-star/VisualPhase";
import AStarCodePhase from "@/components/a-star/CodePhase";

export const metadata = {
  title: "A* Search — KLAR",
};

export default function AStarPage() {
  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">A* Search</h1>
        <p className="text-muted text-lg">
          Pathfinding with heuristic guidance — combines Dijkstra&apos;s
          optimality with greedy best-first speed.
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

      <AStarMathPhase />
      <AStarVisualPhase />
      <AStarCodePhase />
    </div>
  );
}
