"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function GraphDfsMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Depth-first exploration, stack structure, and edge classification"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Core Idea</h3>
          <p className="text-muted mb-4">
            DFS explores a graph <MathBlock tex="G = (V, E)" /> by going as{" "}
            <strong>deep</strong> as possible along each branch before backtracking.
            It uses a stack (implicit via recursion or explicit):
          </p>
          <MathBlock
            tex="\text{DFS}(v): \text{visit } v, \text{ then } \forall u \in \text{Adj}(v) \text{ if } u \notin \text{visited}: \text{DFS}(u)"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">DFS vs. BFS</h3>
          <p className="text-muted mb-4">
            While BFS uses a <strong>FIFO queue</strong> (layer-by-layer), DFS uses a{" "}
            <strong>LIFO stack</strong> (depth-first). BFS finds shortest paths in
            unweighted graphs; DFS is useful for topological sorting, cycle detection,
            and connected components.
          </p>
          <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
            <div className="rounded-lg bg-accent-light/30 p-3">
              <p className="font-semibold mb-1">BFS</p>
              <MathBlock tex="\text{Queue (FIFO)}" />
              <p className="text-muted mt-1">Layer-by-layer</p>
            </div>
            <div className="rounded-lg bg-accent-light/30 p-3">
              <p className="font-semibold mb-1">DFS</p>
              <MathBlock tex="\text{Stack (LIFO)}" />
              <p className="text-muted mt-1">Depth-first</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Edge Classification</h3>
          <p className="text-muted mb-4">
            DFS classifies edges in the graph:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Tree edges:</strong> edges in the DFS tree (to unvisited vertices)
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Back edges:</strong> edges to an ancestor (indicate a <em>cycle</em>)
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Forward/Cross edges:</strong> edges to already-finished vertices
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity</h3>
          <p className="text-muted mb-4">
            Every vertex is visited exactly once, and every edge is examined once (twice
            for undirected graphs):
          </p>
          <MathBlock tex="T(V, E) = O(|V| + |E|)" display />
          <p className="text-muted mt-4 text-sm">
            Same asymptotic complexity as BFS, but the traversal order is fundamentally
            different.
          </p>
        </div>
      </div>
    </section>
  );
}
