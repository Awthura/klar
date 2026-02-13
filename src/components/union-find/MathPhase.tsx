"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function UnionFindMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Equivalence relations, union by rank, and path compression"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Disjoint Set Partitions</h3>
          <p className="text-muted mb-4">
            A <strong>disjoint-set</strong> data structure maintains a collection
            of non-overlapping sets <MathBlock tex="S_1, S_2, \ldots, S_k" /> that
            partition a universe <MathBlock tex="U" />:
          </p>
          <MathBlock
            tex="S_i \cap S_j = \emptyset \;\;\forall i \neq j, \quad \bigcup_i S_i = U"
            display
          />
          <p className="text-muted mt-4">
            Each set is identified by a <em>representative</em> element.
            Two operations: <MathBlock tex="\text{find}(x)" /> returns the
            representative, <MathBlock tex="\text{union}(x, y)" /> merges two sets.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Union by Rank</h3>
          <p className="text-muted mb-4">
            Each tree root has a <em>rank</em> (upper bound on height). When
            merging, attach the shorter tree under the taller:
          </p>
          <MathBlock
            tex="\text{rank}(r_x) < \text{rank}(r_y) \;\Rightarrow\; \text{parent}(r_x) = r_y"
            display
          />
          <p className="text-muted mt-4 mb-4">
            This keeps tree heights logarithmic:
          </p>
          <MathBlock
            tex="\text{height}(T) \leq \lfloor \log_2 n \rfloor"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Path Compression</h3>
          <p className="text-muted mb-4">
            During <MathBlock tex="\text{find}(x)" />, make every node on the
            path point directly to the root:
          </p>
          <MathBlock
            tex="\text{find}(x): \;\; x \to p(x) \to \cdots \to r \;\;\xrightarrow{\text{compress}}\;\; x \to r"
            display
          />
          <p className="text-muted mt-4 mb-4">
            Combined with union by rank, the amortized cost per operation is:
          </p>
          <MathBlock tex="\alpha(n) \quad \text{(inverse Ackermann — effectively } O(1)\text{)}" display />

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">How Slow Does α Grow?</h4>
            <p className="text-sm text-muted">
              <MathBlock tex="\alpha(n) \leq 4" /> for all practical values of{" "}
              <MathBlock tex="n" /> (up to <MathBlock tex="2^{2^{2^{65536}}}" />).
              This makes union-find effectively constant time per operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
