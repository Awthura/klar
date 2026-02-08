"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function BinarySearchMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Formal definition, invariant, and complexity analysis"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Problem Definition</h3>
          <p className="text-muted mb-4">
            Given a sorted array <MathBlock tex="A[0..n-1]" /> and a target value{" "}
            <MathBlock tex="x" />, find the index <MathBlock tex="i" /> such that{" "}
            <MathBlock tex="A[i] = x" />, or determine that <MathBlock tex="x" /> is not
            in the array.
          </p>
          <MathBlock
            tex="A[0] \leq A[1] \leq \cdots \leq A[n-1]"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Loop Invariant</h3>
          <p className="text-muted mb-4">
            At every iteration, if <MathBlock tex="x" /> exists in{" "}
            <MathBlock tex="A" />, then it must lie within the current search
            bounds:
          </p>
          <MathBlock
            tex="A[\text{lo}] \leq x \leq A[\text{hi}]"
            display
          />
          <p className="text-muted mt-4">
            The search space halves each step. We compute the midpoint and compare:
          </p>
          <MathBlock
            tex="\text{mid} = \left\lfloor \frac{\text{lo} + \text{hi}}{2} \right\rfloor"
            display
          />
          <div className="mt-4 space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="A[\text{mid}] = x" />, we found the target.
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="A[\text{mid}] < x" />, then{" "}
              <MathBlock tex="\text{lo} \leftarrow \text{mid} + 1" />.
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              If <MathBlock tex="A[\text{mid}] > x" />, then{" "}
              <MathBlock tex="\text{hi} \leftarrow \text{mid} - 1" />.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity Analysis</h3>
          <p className="text-muted mb-4">
            Each step does <MathBlock tex="O(1)" /> work and halves the search
            space. This gives the recurrence:
          </p>
          <MathBlock tex="T(n) = T(n/2) + O(1)" display />
          <p className="text-muted mt-4 mb-4">
            Solving (or by the Master Theorem, case 2 with{" "}
            <MathBlock tex="a=1, b=2, f(n)=O(1)" />):
          </p>
          <MathBlock tex="T(n) = O(\log n)" display />

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Comparison with Linear Search</h4>
            <p className="text-sm text-muted">
              Linear search examines each element: <MathBlock tex="T(n) = O(n)" />.
              For <MathBlock tex="n = 1{,}000{,}000" />, binary search needs at most{" "}
              <MathBlock tex="\lceil \log_2 10^6 \rceil = 20" /> comparisons vs. up to{" "}
              <MathBlock tex="10^6" /> for linear search.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
