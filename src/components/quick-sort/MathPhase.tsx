"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function QuickSortMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Partition-based sorting, recurrence analysis, and average-case complexity"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Core Idea</h3>
          <p className="text-muted mb-4">
            Quick Sort selects a <strong>pivot</strong> element and partitions the array so
            that all elements <MathBlock tex="\leq" /> pivot are on the left and all
            elements <MathBlock tex=">" /> pivot are on the right. The pivot is then in its
            final sorted position.
          </p>
          <MathBlock
            tex="\text{QuickSort}(A) : \text{partition around pivot, then recurse on both halves}"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Recurrence Relation</h3>
          <p className="text-muted mb-4">
            If the pivot lands at position <MathBlock tex="k" />, we get two subproblems of
            sizes <MathBlock tex="k" /> and <MathBlock tex="n - k - 1" />. Partitioning
            takes <MathBlock tex="O(n)" />:
          </p>
          <MathBlock tex="T(n) = T(k) + T(n - k - 1) + O(n)" display />
          <div className="mt-4 space-y-3 text-sm">
            <p>
              <strong className="text-red-400">Worst case</strong>{" "}
              (<MathBlock tex="k = 0" /> every time, e.g., already sorted input):
            </p>
            <MathBlock tex="T(n) = T(n-1) + O(n) = O(n^2)" display />
            <p>
              <strong className="text-green-400">Average case</strong>{" "}
              (pivot lands roughly in the middle):
            </p>
            <MathBlock tex="T(n) = 2T(n/2) + O(n) = O(n \log n)" display />
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Lomuto Partition Scheme</h3>
          <p className="text-muted mb-4">
            Choose the last element as pivot. Maintain index <MathBlock tex="i" /> such that{" "}
            <MathBlock tex="A[lo..i{-}1] \leq \text{pivot}" /> and{" "}
            <MathBlock tex="A[i..j{-}1] > \text{pivot}" />:
          </p>
          <MathBlock
            tex="\text{for } j = lo \text{ to } hi{-}1: \text{if } A[j] \leq \text{pivot, swap } A[i] \leftrightarrow A[j],\; i{+}{+}"
            display
          />
          <p className="text-muted mt-4">
            Finally, swap <MathBlock tex="A[i] \leftrightarrow A[hi]" /> to place the pivot
            at index <MathBlock tex="i" />.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Why Quick Sort Is Fast in Practice</h3>
          <div className="rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              Despite <MathBlock tex="O(n^2)" /> worst case, Quick Sort is often faster
              than Merge Sort due to: (1) in-place partitioning (no extra{" "}
              <MathBlock tex="O(n)" /> memory), (2) cache-friendly sequential access,
              and (3) randomized pivot selection makes worst case extremely unlikely —
              expected <MathBlock tex="O(n \log n)" /> with high probability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
