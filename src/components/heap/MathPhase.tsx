"use client";

import PhaseHeader from "@/components/shared/PhaseHeader";
import MathBlock from "@/components/shared/MathBlock";

export default function HeapMathPhase() {
  return (
    <section className="mb-16">
      <PhaseHeader
        phase={1}
        title="The Mathematics"
        subtitle="Heap property, array representation, and build-heap analysis"
      />

      <div className="space-y-8">
        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Heap Property</h3>
          <p className="text-muted mb-4">
            A <strong>min-heap</strong> is a complete binary tree where every node is
            smaller than or equal to its children:
          </p>
          <MathBlock
            tex="\forall\, i: A[i] \leq A[2i+1] \text{ and } A[i] \leq A[2i+2]"
            display
          />
          <p className="text-muted mt-4">
            This guarantees <MathBlock tex="A[0] = \min(A)" /> — the root is always the
            minimum.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Array Representation</h3>
          <p className="text-muted mb-4">
            A complete binary tree maps perfectly to an array using index arithmetic:
          </p>
          <div className="space-y-2 text-sm">
            <p>
              <MathBlock tex="\bullet" />{" "}
              Parent of node <MathBlock tex="i" />: <MathBlock tex="\lfloor (i-1)/2 \rfloor" />
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              Left child: <MathBlock tex="2i + 1" />
            </p>
            <p>
              <MathBlock tex="\bullet" />{" "}
              Right child: <MathBlock tex="2i + 2" />
            </p>
          </div>
          <p className="text-muted mt-4 text-sm">
            No pointers needed — the tree structure is implicit in the array indices.
          </p>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Key Operations</h3>
          <div className="space-y-3 text-sm">
            <p>
              <strong>Sift Down:</strong> If a node violates the heap property, swap it
              with its smallest child and repeat. Takes <MathBlock tex="O(\log n)" />.
            </p>
            <p>
              <strong>Build Heap:</strong> Call sift-down from the last non-leaf
              (<MathBlock tex="\lfloor n/2 \rfloor - 1" />) up to the root.
            </p>
            <p>
              <strong>Extract Min:</strong> Remove root, replace with last element, sift
              down. Takes <MathBlock tex="O(\log n)" />.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-card-border bg-card-bg p-6">
          <h3 className="text-lg font-semibold mb-3">Build Heap: O(n), Not O(n log n)</h3>
          <p className="text-muted mb-4">
            Surprisingly, building a heap takes <MathBlock tex="O(n)" />, not{" "}
            <MathBlock tex="O(n \log n)" />. Most nodes are near the leaves and sift
            down only a few levels:
          </p>
          <MathBlock
            tex="\sum_{h=0}^{\lfloor \log n \rfloor} \left\lceil \frac{n}{2^{h+1}} \right\rceil \cdot O(h) = O(n)"
            display
          />
          <div className="mt-4 rounded-lg bg-accent-light/30 p-4">
            <p className="text-sm text-muted">
              There are <MathBlock tex="n/2" /> leaves (sift 0), <MathBlock tex="n/4" />{" "}
              nodes at height 1 (sift 1), etc. The sum converges to <MathBlock tex="O(n)" />.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
