"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function GraphBfsMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Graph definitions, BFS properties, and shortest path theorem"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Graph Definition</h3>
          <p className="text-muted mb-4">
            A graph <MathBlock tex="G = (V, E)" /> consists of a set of vertices{" "}
            <MathBlock tex="V" /> and edges <MathBlock tex="E \subseteq V \times V" />.
            We represent it using an adjacency list:
          </p>
          <MathBlock
            tex="\text{Adj}(v) = \{u \in V : (v, u) \in E\}"
            display
          />
          <p className="text-muted mt-4">
            For an undirected graph, if <MathBlock tex="(u,v) \in E" /> then{" "}
            <MathBlock tex="(v,u) \in E" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">BFS Layer Structure</h3>
          <p className="text-muted mb-4">
            BFS explores vertices in order of their distance from the source{" "}
            <MathBlock tex="s" />. Define layers:
          </p>
          <MathBlock tex="L_d = \{v \in V : \text{dist}(s, v) = d\}" display />
          <div className="mt-4 space-y-3 text-sm">
            <p>
              <MathBlock tex="L_0 = \{s\}" /> — the source itself
            </p>
            <p>
              <MathBlock tex="L_1 = \text{Adj}(s) \setminus L_0" /> — direct neighbors
            </p>
            <p>
              <MathBlock tex="L_{d+1} = \{u : (v,u) \in E, v \in L_d\} \setminus \bigcup_{i \leq d} L_i" />
              — new vertices reachable from layer <MathBlock tex="d" />
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">FIFO Queue Property</h3>
          <p className="text-muted mb-4">
            BFS uses a First-In-First-Out queue. This ensures that all vertices at
            distance <MathBlock tex="d" /> are processed before any vertex at
            distance <MathBlock tex="d+1" />:
          </p>
          <MathBlock
            tex="\text{Queue order:}\; L_0, L_1, L_2, \ldots"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Shortest Path Theorem</h3>
          <div className="rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm font-semibold mb-2">Theorem</p>
            <p className="text-sm text-muted">
              For an unweighted graph <MathBlock tex="G = (V,E)" /> and source{" "}
              <MathBlock tex="s" />, BFS computes{" "}
              <MathBlock tex="\text{dist}(s,v)" /> for all{" "}
              <MathBlock tex="v \in V" /> reachable from <MathBlock tex="s" />,
              where <MathBlock tex="\text{dist}(s,v)" /> is the minimum number of
              edges on any path from <MathBlock tex="s" /> to <MathBlock tex="v" />.
            </p>
          </div>
          <p className="text-muted mt-4 text-sm">
            <strong>Complexity:</strong> Each vertex is enqueued and dequeued at most once,
            and each edge is examined at most twice (once from each endpoint):
          </p>
          <MathBlock tex="T(V, E) = O(|V| + |E|)" display />
        </div>
      </div>
    </section>
  );
}
