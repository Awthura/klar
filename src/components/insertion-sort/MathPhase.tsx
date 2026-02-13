"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function InsertionSortMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Loop invariant, stability, and case analysis"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Loop Invariant</h3>
          <p className="text-muted mb-4">
            At the start of each outer loop iteration <MathBlock tex="i" />,
            the subarray <MathBlock tex="A[0..i-1]" /> consists of the elements
            originally in <MathBlock tex="A[0..i-1]" /> but in sorted order:
          </p>
          <MathBlock
            tex="\text{Invariant: } A[0] \leq A[1] \leq \cdots \leq A[i-1]"
            display
          />
          <p className="text-muted mt-4">
            Each iteration takes element <MathBlock tex="A[i]" /> (the{" "}
            <em>key</em>) and inserts it into the correct position within the
            sorted prefix, extending the sorted region by one.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Complexity Analysis</h3>
          <p className="text-muted mb-4">
            The number of comparisons depends on the input order:
          </p>
          <div className="space-y-3">
            <div>
              <MathBlock
                tex="\text{Best case (sorted): } T(n) = O(n)"
                display
              />
              <p className="text-xs text-muted mt-1 ml-4">
                Each key is already in place — inner loop never executes.
              </p>
            </div>
            <div>
              <MathBlock
                tex="\text{Worst case (reverse sorted): } T(n) = O(n^2)"
                display
              />
              <p className="text-xs text-muted mt-1 ml-4">
                Each key shifts all the way to position 0:{" "}
                <MathBlock tex="\sum_{i=1}^{n-1} i = \frac{n(n-1)}{2}" />.
              </p>
            </div>
            <div>
              <MathBlock
                tex="\text{Average case: } T(n) = O(n^2)"
                display
              />
              <p className="text-xs text-muted mt-1 ml-4">
                Expected comparisons:{" "}
                <MathBlock tex="\sum_{i=1}^{n-1} \frac{i}{2} = \frac{n(n-1)}{4}" />.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Properties</h3>
          <p className="text-muted mb-4">
            Insertion sort has several useful properties:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Stable:</strong> equal elements maintain their relative order
              (compare with <MathBlock tex=">" />, not <MathBlock tex="\geq" />)
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>In-place:</strong> uses only <MathBlock tex="O(1)" /> extra
              space
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Adaptive:</strong> runs in <MathBlock tex="O(n + d)" /> where{" "}
              <MathBlock tex="d" /> is the number of inversions
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              <strong>Online:</strong> can sort elements as they arrive
            </p>
          </div>

          <div className="mt-6 rounded-lg bg-accent-light/30 p-4">
            <h4 className="text-sm font-semibold mb-2">When to Use Insertion Sort</h4>
            <p className="text-sm text-muted">
              Optimal for small arrays (<MathBlock tex="n \leq 20" />) or
              nearly-sorted data. Many hybrid algorithms (Timsort, introsort) use
              insertion sort as a subroutine for small partitions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
