"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function DijkstraMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Greedy relaxation, priority queue, and shortest-path optimality"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Problem Definition</h3>
          <p className="text-muted mb-4">
            Given a weighted directed graph <MathBlock tex="G = (V, E)" /> with
            non-negative edge weights <MathBlock tex="w(u, v) \geq 0" /> and a source
            vertex <MathBlock tex="s" />, find the shortest path distance from{" "}
            <MathBlock tex="s" /> to every other vertex:
          </p>
          <MathBlock
            tex="\text{dist}(s, v) = \min \sum_{(u_i, u_{i+1}) \in P} w(u_i, u_{i+1})"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Relaxation</h3>
          <p className="text-muted mb-4">
            The key operation: if we find a shorter path to{" "}
            <MathBlock tex="u" /> via <MathBlock tex="v" />, update the estimate:
          </p>
          <MathBlock
            tex="\text{if } \text{dist}(v) + w(v, u) < \text{dist}(u): \quad \text{dist}(u) \leftarrow \text{dist}(v) + w(v, u)"
            display
          />
          <p className="text-muted mt-4 text-sm">
            This is called &ldquo;relaxing&rdquo; the edge <MathBlock tex="(v, u)" />.
            When no more relaxations are possible, all distances are optimal.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Greedy Strategy</h3>
          <p className="text-muted mb-4">
            Dijkstra&apos;s key insight: always process the unvisited vertex with the
            smallest tentative distance. This greedy choice is correct because edge
            weights are non-negative — no future path can improve the current minimum:
          </p>
          <MathBlock
            tex="v^* = \arg\min_{v \notin S} \text{dist}(v)"
            display
          />
          <p className="text-muted mt-4 text-sm">
            A <strong>min-priority queue</strong> efficiently finds this minimum.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity</h3>
          <p className="text-muted mb-4">
            With a binary min-heap priority queue:
          </p>
          <MathBlock
            tex="T = O\bigl((|V| + |E|) \log |V|\bigr)"
            display
          />
          <div className="mt-4 rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              Each vertex is extracted once (<MathBlock tex="O(|V| \log |V|)" />) and each
              edge triggers at most one priority queue update
              (<MathBlock tex="O(|E| \log |V|)" />). With a Fibonacci heap this
              improves to <MathBlock tex="O(|V| \log |V| + |E|)" />.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
