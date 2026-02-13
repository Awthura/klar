"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function TopologicalSortMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="DAG ordering, DFS finish times, and correctness"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">DAG & Topological Order</h3>
          <p className="text-muted mb-4">
            A <strong>Directed Acyclic Graph</strong> (DAG) is a directed graph{" "}
            <MathBlock tex="G = (V, E)" /> with no cycles. A topological ordering
            is a linear ordering of vertices such that:
          </p>
          <MathBlock
            tex="\forall (u, v) \in E: \quad u \text{ appears before } v"
            display
          />
          <p className="text-muted mt-4">
            A topological order exists if and only if the graph is a DAG. A DAG
            with <MathBlock tex="n" /> vertices may have many valid orderings.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">DFS Finish-Time Ordering</h3>
          <p className="text-muted mb-4">
            DFS assigns each node a <em>finish time</em> — when all descendants
            have been explored. The key insight:
          </p>
          <MathBlock
            tex="(u, v) \in E \;\Rightarrow\; \text{finish}(u) > \text{finish}(v)"
            display
          />
          <p className="text-muted mt-4 mb-4">
            Sorting by <em>decreasing</em> finish time gives a valid topological
            order. Equivalently, push to a stack on finish and reverse:
          </p>
          <MathBlock
            tex="\text{topo\_order} = \text{reverse}([\text{finish order}])"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity</h3>
          <p className="text-muted mb-4">
            DFS visits every vertex and edge exactly once:
          </p>
          <MathBlock tex="T(V, E) = O(V + E)" display />

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Common Application</h4>
            <p className="text-sm text-muted">
              Course scheduling: if course A is a prerequisite of course B, then
              edge <MathBlock tex="(A, B)" /> ensures A is scheduled before B.
              The topological sort gives a valid course sequence.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
