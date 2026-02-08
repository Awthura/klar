"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function DpMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Optimal substructure, overlapping subproblems, and the Fibonacci example"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Two Key Properties</h3>
          <p className="text-muted mb-4">
            Dynamic Programming applies when a problem has:
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-phase1">1. Optimal Substructure:</strong> An optimal
              solution contains optimal solutions to subproblems.
            </p>
            <p>
              <strong className="text-phase2">2. Overlapping Subproblems:</strong> The same
              subproblems are solved repeatedly in a naive recursive approach.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Fibonacci: The Classic Example</h3>
          <p className="text-muted mb-4">
            The Fibonacci sequence is defined by the recurrence:
          </p>
          <MathBlock
            tex="F(n) = F(n-1) + F(n-2), \quad F(0) = 0,\; F(1) = 1"
            display
          />
          <p className="text-muted mt-4">
            This has both properties: <MathBlock tex="F(n)" /> depends on smaller
            subproblems (<MathBlock tex="F(n{-}1), F(n{-}2)" />), and the same values
            are recomputed many times.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Naive Recursion: Exponential</h3>
          <p className="text-muted mb-4">
            A direct recursive implementation computes the same subproblems repeatedly.
            The call tree grows exponentially:
          </p>
          <MathBlock tex="T(n) = T(n{-}1) + T(n{-}2) + O(1) = O(2^n)" display />
          <p className="text-muted mt-4 text-sm">
            For <MathBlock tex="F(7)" />, the naive approach makes 41 calls.{" "}
            <MathBlock tex="F(3)" /> alone is computed 5 times!
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">
            Bottom-Up DP: Linear
          </h3>
          <p className="text-muted mb-4">
            Instead, fill a table from the base cases up. Each subproblem is computed
            exactly once:
          </p>
          <MathBlock
            tex="\text{dp}[i] = \text{dp}[i{-}1] + \text{dp}[i{-}2] \quad \text{for } i = 2, \ldots, n"
            display
          />
          <MathBlock tex="T(n) = O(n),\quad S(n) = O(n)" display />
          <div className="mt-4 rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              DP trades space for time: by storing <MathBlock tex="n+1" /> values in a
              table, we eliminate all redundant computation. This is the essence of{" "}
              <strong>memoization</strong> (top-down) or <strong>tabulation</strong>{" "}
              (bottom-up).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
