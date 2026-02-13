"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function AStarMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Heuristic search, admissibility, and optimality guarantees"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Evaluation Function</h3>
          <p className="text-muted mb-4">
            A* evaluates each node <MathBlock tex="n" /> using a function that
            combines the actual cost from the start with a heuristic estimate to
            the goal:
          </p>
          <MathBlock tex="f(n) = g(n) + h(n)" display />
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              <MathBlock tex="g(n)" />: actual cost of the cheapest path from start to{" "}
              <MathBlock tex="n" />
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <MathBlock tex="h(n)" />: heuristic estimate of the cost from{" "}
              <MathBlock tex="n" /> to the goal
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <MathBlock tex="f(n)" />: estimated total cost of the cheapest path
              through <MathBlock tex="n" />
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Admissible Heuristic</h3>
          <p className="text-muted mb-4">
            A heuristic is <em>admissible</em> if it never overestimates the true
            cost to the goal:
          </p>
          <MathBlock
            tex="0 \leq h(n) \leq h^*(n) \quad \forall n"
            display
          />
          <p className="text-muted mt-4 mb-4">
            For grid-based pathfinding, the <strong>Manhattan distance</strong> is
            admissible when only 4-directional movement is allowed:
          </p>
          <MathBlock
            tex="h(n) = |n_{\text{row}} - g_{\text{row}}| + |n_{\text{col}} - g_{\text{col}}|"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Optimality Proof</h3>
          <p className="text-muted mb-4">
            If <MathBlock tex="h" /> is admissible, A* is optimal. Suppose A*
            returns a path with cost <MathBlock tex="C" /> via goal node. For any
            unexpanded node <MathBlock tex="n" /> on an optimal path:
          </p>
          <MathBlock
            tex="f(n) = g(n) + h(n) \leq g(n) + h^*(n) = g^*(\text{goal}) \leq C"
            display
          />
          <p className="text-muted mt-4">
            A* would have expanded <MathBlock tex="n" /> before the goal (since{" "}
            <MathBlock tex="f(n) \leq C" />), contradicting that the goal was
            chosen first. Therefore <MathBlock tex="C" /> must be optimal.
          </p>

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">A* vs. Dijkstra</h4>
            <p className="text-sm text-muted">
              Dijkstra is A* with <MathBlock tex="h(n) = 0" />. The heuristic
              focuses the search toward the goal, expanding fewer nodes.
              With a perfect heuristic <MathBlock tex="h = h^*" />, A* expands
              only nodes on the optimal path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
