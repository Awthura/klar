"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function MergeSortMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Divide-and-conquer paradigm, recurrence, and proof of correctness"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Divide-and-Conquer Paradigm</h3>
          <p className="text-muted mb-4">
            Merge Sort breaks the problem into three steps:
          </p>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-phase1">Divide:</strong> Split the array{" "}
              <MathBlock tex="A[0..n-1]" /> into two halves at the midpoint{" "}
              <MathBlock tex="\lfloor n/2 \rfloor" />.
            </p>
            <p>
              <strong className="text-phase2">Conquer:</strong> Recursively sort each half.
            </p>
            <p>
              <strong className="text-phase3">Combine:</strong> Merge the two sorted halves
              into a single sorted array.
            </p>
          </div>
          <MathBlock
            tex="\text{MergeSort}(A) = \text{Merge}\bigl(\text{MergeSort}(A_L),\; \text{MergeSort}(A_R)\bigr)"
            display
          />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Recurrence Relation</h3>
          <p className="text-muted mb-4">
            Each recursive call processes half the array. The merge step takes{" "}
            <MathBlock tex="O(n)" /> to combine two sorted halves:
          </p>
          <MathBlock tex="T(n) = 2T(n/2) + O(n)" display />
          <p className="text-muted mt-4 mb-4">
            Applying the <strong>Master Theorem</strong> (case 2: <MathBlock tex="a=2, b=2, f(n)=O(n)" />,
            so <MathBlock tex="\log_b a = 1" /> and <MathBlock tex="f(n) = \Theta(n^{\log_b a})" />):
          </p>
          <MathBlock tex="T(n) = O(n \log n)" display />
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">The Merge Operation</h3>
          <p className="text-muted mb-4">
            Given two sorted sequences <MathBlock tex="L" /> and <MathBlock tex="R" />,
            the merge produces a sorted union by repeatedly taking the smaller head element:
          </p>
          <MathBlock
            tex="\text{Merge}(L, R): \text{while } L \neq \emptyset \text{ and } R \neq \emptyset, \text{ take } \min(\text{head}(L), \text{head}(R))"
            display
          />
          <p className="text-muted mt-4">
            Each element is compared at most once, so the merge takes{" "}
            <MathBlock tex="O(|L| + |R|) = O(n)" /> time.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Correctness (by Induction)</h3>
          <p className="text-muted mb-3">
            <strong>Base case:</strong> An array of size <MathBlock tex="\leq 1" /> is trivially sorted.
          </p>
          <p className="text-muted mb-3">
            <strong>Inductive step:</strong> Assume <MathBlock tex="\text{MergeSort}" /> correctly sorts
            arrays of size <MathBlock tex="< n" />. Then for size <MathBlock tex="n" />:
          </p>
          <div className="text-sm text-muted space-y-1 ml-4">
            <p><MathBlock tex="\bullet" /> Both halves are correctly sorted (by inductive hypothesis)</p>
            <p><MathBlock tex="\bullet" /> <MathBlock tex="\text{Merge}" /> correctly combines two sorted sequences</p>
            <p><MathBlock tex="\bullet" /> Therefore the result is sorted <MathBlock tex="\blacksquare" /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
